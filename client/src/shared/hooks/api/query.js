import { useRef, useCallback, useEffect } from 'react';
import { isEqual } from 'lodash';

import api from 'shared/utils/api';
import useMergeState from 'shared/hooks/mergeState';
import useDeepCompareMemoize from 'shared/hooks/deepCompareMemoize';

const useQuery = (url, propsVariables = {}, options = {}) => {
  const { lazy = false, cachePolicy = 'cache-first' } = options;

  const wasCalled = useRef(false);
  const propsVariablesMemoized = useDeepCompareMemoize(propsVariables);

  const isSleeping = lazy && !wasCalled.current;
  const isCacheAvailable = cache[url] && isEqual(cache[url].apiVariables, propsVariables);
  const canUseCache = isCacheAvailable && cachePolicy !== 'no-cache' && !wasCalled.current;

  const [state, mergeState] = useMergeState({
    data: canUseCache ? cache[url].data : null,
    error: null,
    isLoading: !lazy && !canUseCache,
    variables: {},
  });

  const makeRequest = useCallback(
    newVariables => {
      const variables = { ...state.variables, ...(newVariables || {}) };
      const apiVariables = { ...propsVariablesMemoized, ...variables };

      const skipLoading = canUseCache && cachePolicy === 'cache-first';

      if (!skipLoading) {
        mergeState({ isLoading: true, variables });
      } else if (newVariables) {
        mergeState({ variables });
      }

      api.get(url, apiVariables).then(
        data => {
          cache[url] = { data, apiVariables };
          mergeState({ data, error: null, isLoading: false });
        },
        error => {
          mergeState({ error, data: null, isLoading: false });
        },
      );

      wasCalled.current = true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [propsVariablesMemoized],
  );

  useEffect(() => {
    if (isSleeping) return;
    if (canUseCache && cachePolicy === 'cache-only') return;

    makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeRequest]);

  const setLocalData = useCallback(
    getUpdatedData =>
      mergeState(({ data }) => {
        const updatedData = getUpdatedData(data);
        cache[url] = { ...(cache[url] || {}), data: updatedData };
        return { data: updatedData };
      }),
    [mergeState, url],
  );

  return [
    {
      ...state,
      variables: { ...propsVariablesMemoized, ...state.variables },
      setLocalData,
    },
    makeRequest,
  ];
};

const cache = {};

export default useQuery;
