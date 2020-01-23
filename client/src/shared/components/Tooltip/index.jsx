import React, { Fragment, useState, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import useOnOutsideClick from 'shared/hooks/onOutsideClick';

import { StyledTooltip } from './Styles';

const propTypes = {
  className: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  offset: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
  width: PropTypes.number.isRequired,
  renderLink: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
};

const defaultProps = {
  className: undefined,
  placement: 'bottom',
  offset: {
    top: 0,
    left: 0,
  },
};

const Tooltip = ({ className, placement, offset, width, renderLink, renderContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const $linkRef = useRef();
  const $tooltipRef = useRef();

  const openTooltip = () => setIsOpen(true);
  const closeTooltip = () => setIsOpen(false);

  useOnOutsideClick([$tooltipRef, $linkRef], isOpen, closeTooltip);

  useLayoutEffect(() => {
    const setTooltipPosition = () => {
      const { top, left } = calcPosition(offset, placement, $tooltipRef, $linkRef);
      $tooltipRef.current.style.top = `${top}px`;
      $tooltipRef.current.style.left = `${left}px`;
    };

    if (isOpen) {
      setTooltipPosition();
      window.addEventListener('resize', setTooltipPosition);
      window.addEventListener('scroll', setTooltipPosition);
    }

    return () => {
      window.removeEventListener('resize', setTooltipPosition);
      window.removeEventListener('scroll', setTooltipPosition);
    };
  }, [isOpen, offset, placement]);

  return (
    <Fragment>
      {renderLink({ ref: $linkRef, onClick: isOpen ? closeTooltip : openTooltip })}

      {isOpen &&
        ReactDOM.createPortal(
          <StyledTooltip className={className} ref={$tooltipRef} width={width}>
            {renderContent({ close: closeTooltip })}
          </StyledTooltip>,
          $root,
        )}
    </Fragment>
  );
};

const calcPosition = (offset, placement, $tooltipRef, $linkRef) => {
  const margin = 10;
  const finalOffset = { ...defaultProps.offset, ...offset };

  const tooltipRect = $tooltipRef.current.getBoundingClientRect();
  const linkRect = $linkRef.current.getBoundingClientRect();

  const linkCenterY = linkRect.top + linkRect.height / 2;
  const linkCenterX = linkRect.left + linkRect.width / 2;

  const placements = {
    top: {
      top: linkRect.top - margin - tooltipRect.height,
      left: linkCenterX - tooltipRect.width / 2,
    },
    right: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.right + margin,
    },
    bottom: {
      top: linkRect.bottom + margin,
      left: linkCenterX - tooltipRect.width / 2,
    },
    left: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.left - margin - tooltipRect.width,
    },
  };
  return {
    top: placements[placement].top + finalOffset.top,
    left: placements[placement].left + finalOffset.left,
  };
};

const $root = document.getElementById('root');

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
