import { useRef, useCallback, useEffect } from 'react';
import { isEqual } from 'lodash';

import api from 'shared/utils/api';
import useMergeState from 'shared/hooks/mergeState';
import useDeepCompareMemoize from 'shared/hooks/deepCompareMemoize';

const useQuery = (
  url,
  propsVariables = {},
  { lazy = false, cachePolicy = CachePolicy.CACHE_FIRST } = {},
) => {
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
    (newVariables = {}) => {
      const variables = { ...stateRef.current.variables, ...newVariables };
      const apiVariables = { ...propsVariablesMemoized, ...variables };

      const isCacheAvailable = cache[url] && isEqual(cache[url].apiVariables, apiVariables);
      const isCacheAvailableAndPermitted = isCacheAvailable && cachePolicy !== CachePolicy.NO_CACHE;

      if (isCacheAvailableAndPermitted) {
        mergeState({ data: cache[url].data, error: null, isLoading: false, variables });

        if (cachePolicy === CachePolicy.CACHE_ONLY) {
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
      makeRequest();
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

const CachePolicy = {
  CACHE_ONLY: 'cache-only',
  CACHE_FIRST: 'cache-first',
  NO_CACHE: 'no-cache',
};

export default useQuery;
