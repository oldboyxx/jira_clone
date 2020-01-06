import { useEffect, useRef } from 'react';

import useDeepCompareMemoize from 'shared/hooks/deepCompareMemoize';

const useOnOutsideClick = (
  $ignoredElementRefs,
  isListening,
  onOutsideClick,
  $listeningElementRef,
) => {
  const $mouseDownTargetRef = useRef();
  const $ignoredElementRefsMemoized = useDeepCompareMemoize([$ignoredElementRefs].flat());

  useEffect(() => {
    const handleMouseDown = event => {
      $mouseDownTargetRef.current = event.target;
    };

    const handleMouseUp = event => {
      const isAnyIgnoredElementAncestorOfTarget = $ignoredElementRefsMemoized.some(
        $elementRef =>
          $elementRef.current.contains($mouseDownTargetRef.current) ||
          $elementRef.current.contains(event.target),
      );
      if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
        onOutsideClick();
      }
    };

    const $listeningElement = ($listeningElementRef || {}).current || document;

    if (isListening) {
      $listeningElement.addEventListener('mousedown', handleMouseDown);
      $listeningElement.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', handleMouseDown);
      $listeningElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [$ignoredElementRefsMemoized, $listeningElementRef, isListening, onOutsideClick]);
};

export default useOnOutsideClick;
