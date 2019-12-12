/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useCallback, useEffect } from 'react';

import api from 'shared/utils/api';
import useDeepCompareMemoize from './deepCompareMemoize';

const useApi = (method, url, paramsOrData = {}, { lazy = false } = {}) => {
  const isCalledAutomatically = method === 'get' && !lazy;

  const [state, setState] = useState({
    data: null,
    error: null,
    isLoading: isCalledAutomatically,
    variables: {},
  });

  const wasCalledRef = useRef(false);

  const paramsOrDataMemoized = useDeepCompareMemoize(paramsOrData);
  const stateRef = useRef();
  stateRef.current = state;

  const makeRequest = useCallback(
    (newVariables = {}) =>
      new Promise((resolve, reject) => {
        const updateState = newState => setState({ ...stateRef.current, ...newState });
        const variables = { ...stateRef.current.variables, ...newVariables };

        if (!isCalledAutomatically || wasCalledRef.current) {
          updateState({ variables, isLoading: true });
        }

        api[method](url, { ...paramsOrDataMemoized, ...variables }).then(
          data => {
            resolve(data);
            updateState({ data, error: null, isLoading: false });
          },
          error => {
            reject(error);
            updateState({ error, data: null, isLoading: false });
          },
        );

        wasCalledRef.current = true;
      }),
    [method, paramsOrDataMemoized, isCalledAutomatically, url],
  );

  useEffect(() => {
    if (isCalledAutomatically) {
      makeRequest();
    }
  }, [makeRequest, isCalledAutomatically]);

  return [
    {
      ...state,
      wasCalled: wasCalledRef.current,
      variables: { ...paramsOrDataMemoized, ...state.variables },
    },
    makeRequest,
  ];
};

export default {
  get: (...args) => useApi('get', ...args),
  post: (...args) => useApi('post', ...args),
  put: (...args) => useApi('put', ...args),
  patch: (...args) => useApi('patch', ...args),
  delete: (...args) => useApi('delete', ...args),
};
