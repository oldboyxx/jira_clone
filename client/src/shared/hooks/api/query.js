import { useRef, useCallback, useEffect } from 'react';
import { isEqual } from 'lodash';

import api from 'shared/utils/api';
import useMergeState from 'shared/hooks/mergeState';
import useDeepCompareMemoize from 'shared/hooks/deepCompareMemoize';

const useQuery = (url, propsVariables = {}, options = {}) => {
  const { lazy = false, cachePolicy = 'cache-first' } = options;

  const [state, mergeState] = useMergeState({
    data: null,
    error: null,
    isLoading: !lazy,
    wasCalled: !lazy,
    variables: {},
  });

  const wasCalledRef = useRef(false);
  const propsVariablesMemoized = useDeepCompareMemoize(propsVariables);

  const stateRef = useRef();
  stateRef.current = state;

  const makeRequest = useCallback(
    (newVariables = {}, isAutoCalled) => {
      const variables = { ...stateRef.current.variables, ...newVariables };
      const apiVariables = { ...propsVariablesMemoized, ...variables };

      const isCacheAvailable = cache[url] && isEqual(cache[url].apiVariables, apiVariables);

      const isCacheAvailableAndPermitted =
        isCacheAvailable && isAutoCalled && cachePolicy !== 'no-cache';

      if (isCacheAvailableAndPermitted) {
        mergeState({ data: cache[url].data, error: null, isLoading: false, variables });

        if (cachePolicy === 'cache-only') {
          return;
        }
      }

      if (!isCacheAvailableAndPermitted && (lazy || wasCalledRef.current)) {
        mergeState({ isLoading: true, variables });
      }

      api.get(url, apiVariables).then(
        data => {
          cache[url] = { apiVariables, data };
          mergeState({ data, error: null, isLoading: false });
        },
        error => {
          mergeState({ error, data: null, isLoading: false });
        },
      );

      wasCalledRef.current = true;
    },
    [propsVariablesMemoized, cachePolicy, url, lazy, mergeState],
  );

  useEffect(() => {
    if (!lazy || wasCalledRef.current) {
      makeRequest({}, true);
    }
  }, [lazy, makeRequest]);

  const setLocalData = useCallback(
    getUpdatedData => mergeState(({ data }) => ({ data: getUpdatedData(data) })),
    [mergeState],
  );

  return [
    {
      ...state,
      wasCalled: wasCalledRef.current,
      variables: { ...propsVariablesMemoized, ...state.variables },
      setLocalData,
    },
    makeRequest,
  ];
};

const cache = {};

export default useQuery;
