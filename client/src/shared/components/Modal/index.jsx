import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { uniqueId as uniqueIncreasingIntegerId } from 'lodash';

import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import useOnEscapeKeyDown from 'shared/hooks/onEscapeKeyDown';
import { ScrollOverlay, ClickableOverlay, StyledModal, CloseIcon } from './Styles';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['center', 'aside']),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  renderLink: PropTypes.func,
  renderContent: PropTypes.func.isRequired,
};

const defaultProps = {
  className: undefined,
  variant: 'center',
  isOpen: undefined,
  onClose: () => {},
  renderLink: () => {},
};

const Modal = ({
  className,
  variant,
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderLink,
  renderContent,
}) => {
  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = isControlled ? propsIsOpen : stateIsOpen;

  const $modalRef = useRef();
  const modalIdRef = useRef(uniqueIncreasingIntegerId());

  const closeModal = useCallback(() => {
    if (hasChildModal(modalIdRef.current)) {
      return;
    }
    if (!isControlled) {
      setStateOpen(false);
    } else {
      tellParentToClose();
    }
  }, [isControlled, tellParentToClose]);

  useOnOutsideClick($modalRef, isOpen, closeModal);
  useOnEscapeKeyDown(isOpen, closeModal);
  useEffect(setBodyScrollLock, [isOpen]);

  const renderModal = () => (
    <ScrollOverlay data-jira-modal-id={modalIdRef.current}>
      <ClickableOverlay variant={variant}>
        <StyledModal className={className} variant={variant} ref={$modalRef}>
          <CloseIcon type="close" variant={variant} onClick={closeModal} />
          {renderContent({ close: closeModal })}
        </StyledModal>
      </ClickableOverlay>
    </ScrollOverlay>
  );

  return (
    <>
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}
      {isOpen && ReactDOM.createPortal(renderModal(), $root)}
    </>
  );
};

const $root = document.getElementById('root');

const getIdsOfAllOpenModals = () => {
  const $modalNodes = Array.from(document.querySelectorAll('[data-jira-modal-id]'));
  return $modalNodes.map($node => parseInt($node.getAttribute('data-jira-modal-id')));
};

const hasChildModal = modalId => getIdsOfAllOpenModals().some(id => id > modalId);

const setBodyScrollLock = () => {
  const areAnyModalsOpen = getIdsOfAllOpenModals().length > 0;
  document.body.style.overflow = areAnyModalsOpen ? 'hidden' : 'visible';
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
