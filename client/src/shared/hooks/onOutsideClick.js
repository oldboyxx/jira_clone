import { useEffect, useRef } from 'react';

import useDeepCompareMemoize from 'shared/hooks/deepCompareMemoize';

const useOnOutsideClick = (
  $ignoredElementRefs,
  shouldListen,
  onOutsideClick,
  $listeningElementRef = {},
) => {
  const $mouseDownTargetRef = useRef();
  const $ignoredElementRefsMemoized = useDeepCompareMemoize([$ignoredElementRefs].flat());

  useEffect(() => {
    const handleMouseDown = event => {
      $mouseDownTargetRef.current = event.target;
    };
    const handleMouseUp = event => {
      const noIgnoredElementsContainTarget = $ignoredElementRefsMemoized.every(
        $elementRef =>
          !$elementRef.current.contains($mouseDownTargetRef.current) &&
          !$elementRef.current.contains(event.target),
      );
      if (event.button === 0 && noIgnoredElementsContainTarget) {
        onOutsideClick();
      }
    };
    const $listeningElement = $listeningElementRef.current || document;
    if (shouldListen) {
      $listeningElement.addEventListener('mousedown', handleMouseDown);
      $listeningElement.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', handleMouseDown);
      $listeningElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [$ignoredElementRefsMemoized, $listeningElementRef, shouldListen, onOutsideClick]);
};

export default useOnOutsideClick;
