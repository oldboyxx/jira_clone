import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import useOnEscapeKeyDown from 'shared/hooks/onEscapeKeyDown';

import { ScrollOverlay, ClickableOverlay, StyledModal, CloseIcon } from './Styles';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['center', 'aside']),
  width: PropTypes.number,
  withCloseIcon: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  renderLink: PropTypes.func,
  renderContent: PropTypes.func.isRequired,
};

const defaultProps = {
  className: undefined,
  variant: 'center',
  width: 600,
  withCloseIcon: true,
  isOpen: undefined,
  onClose: () => {},
  renderLink: () => {},
};

const Modal = ({
  className,
  variant,
  width,
  withCloseIcon,
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderLink,
  renderContent,
}) => {
  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = isControlled ? propsIsOpen : stateIsOpen;

  const $modalRef = useRef();
  const $clickableOverlayRef = useRef();

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false);
    } else {
      tellParentToClose();
    }
  }, [isControlled, tellParentToClose]);

  useOnOutsideClick($modalRef, isOpen, closeModal, $clickableOverlayRef);
  useOnEscapeKeyDown(isOpen, closeModal);
  useEffect(setBodyScrollLock, [isOpen]);

  return (
    <>
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}

      {isOpen &&
        ReactDOM.createPortal(
          <ScrollOverlay data-jira-modal="true">
            <ClickableOverlay variant={variant} ref={$clickableOverlayRef}>
              <StyledModal className={className} variant={variant} width={width} ref={$modalRef}>
                {withCloseIcon && <CloseIcon type="close" variant={variant} onClick={closeModal} />}
                {renderContent({ close: closeModal })}
              </StyledModal>
            </ClickableOverlay>
          </ScrollOverlay>,
          $root,
        )}
    </>
  );
};

const $root = document.getElementById('root');

const setBodyScrollLock = () => {
  const areAnyModalsOpen = !!document.querySelector('[data-jira-modal]');
  document.body.style.overflow = areAnyModalsOpen ? 'hidden' : 'visible';
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
