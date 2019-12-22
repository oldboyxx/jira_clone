import { useState, useRef, useCallback, useEffect } from 'react';

import api from 'shared/utils/api';
import useDeepCompareMemoize from './deepCompareMemoize';

const useApi = (method, url, variables = {}, { lazy = false } = {}) => {
  const isCalledAutomatically = method === 'get' && !lazy;

  const [state, setState] = useState({
    data: null,
    error: null,
    isWorking: isCalledAutomatically,
    additionalVariables: {},
  });

  const setStateMerge = newState => setState(currentState => ({ ...currentState, ...newState }));

  const wasCalledRef = useRef(false);
  const variablesMemoized = useDeepCompareMemoize(variables);

  const stateRef = useRef();
  stateRef.current = state;

  const makeRequest = useCallback(
    (newVariables = {}) =>
      new Promise((resolve, reject) => {
        const additionalVariables = { ...stateRef.current.additionalVariables, ...newVariables };

        if (!isCalledAutomatically || wasCalledRef.current) {
          setStateMerge({ additionalVariables, isWorking: true });
        }

        api[method](url, { ...variablesMemoized, ...additionalVariables }).then(
          data => {
            resolve(data);
            setStateMerge({ data, error: null, isWorking: false });
          },
          error => {
            reject(error);
            setStateMerge({ error, data: null, isWorking: false });
          },
        );

        wasCalledRef.current = true;
      }),
    [method, variablesMemoized, isCalledAutomatically, url],
  );

  useEffect(() => {
    if (isCalledAutomatically) {
      makeRequest();
    }
  }, [makeRequest, isCalledAutomatically]);

  const setLocalData = useCallback(
    getUpdatedData =>
      setState(currentState => ({ ...currentState, data: getUpdatedData(currentState.data) })),
    [],
  );

  const result = [
    {
      ...state,
      [isWorkingAlias[method]]: state.isWorking,
      wasCalled: wasCalledRef.current,
      variables: { ...variablesMemoized, ...state.additionalVariables },
      setLocalData,
    },
    makeRequest,
  ];

  return result;
};

const isWorkingAlias = {
  get: 'isLoading',
  post: 'isCreating',
  put: 'isUpdating',
  patch: 'isUpdating',
  delete: 'isDeleting',
};

/* eslint-disable react-hooks/rules-of-hooks */
export default {
  get: (...args) => useApi('get', ...args),
  post: (...args) => useApi('post', ...args),
  put: (...args) => useApi('put', ...args),
  patch: (...args) => useApi('patch', ...args),
  delete: (...args) => useApi('delete', ...args),
};
