import { useEffect, useRef } from 'react';

const useOnOutsideClick = ($elementRef, isListening, onOutsideClick) => {
  const $mouseDownTargetRef = useRef();

  useEffect(() => {
    const handleMouseDown = event => {
      $mouseDownTargetRef.current = event.target;
    };
    const handleMouseUp = event => {
      if (
        event.button === 0 &&
        !$elementRef.current.contains($mouseDownTargetRef.current) &&
        !$elementRef.current.contains(event.target)
      ) {
        onOutsideClick();
      }
    };
    if (isListening) {
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [$elementRef, isListening, onOutsideClick]);
};

export default useOnOutsideClick;
