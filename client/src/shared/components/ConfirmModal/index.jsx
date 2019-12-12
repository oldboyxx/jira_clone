import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  StyledConfirmModal,
  Title,
  Message,
  InputLabel,
  StyledInput,
  StyledButton,
} from './Styles';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmInput: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'danger']),
  onConfirm: PropTypes.func.isRequired,
  renderLink: PropTypes.func.isRequired,
};

const defaultProps = {
  className: undefined,
  title: 'Warning',
  message: 'Are you sure you want to continue with this action?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmInput: null,
  type: 'primary',
};

const ConfirmModal = ({
  className,
  title,
  message,
  confirmText,
  cancelText,
  confirmInput,
  type,
  onConfirm,
  renderLink,
}) => {
  const [isConfirmEnabled, setConfirmEnabled] = useState(false);
  const [isWorking, setWorking] = useState(false);

  const handleConfirm = modal => {
    setWorking(true);
    onConfirm({
      close: () => {
        modal.close();
        setWorking(false);
      },
    });
  };

  const handleConfirmInputChange = value =>
    setConfirmEnabled(value.trim().toLowerCase() === confirmInput.toLowerCase());

  return (
    <StyledConfirmModal
      suppressClassNameWarning
      className={className}
      afterClose={() => setConfirmEnabled(false)}
      renderLink={renderLink}
      renderContent={modal => (
        <>
          <Title>{title}</Title>
          {message && <Message>{message}</Message>}
          {confirmInput && (
            <>
              <InputLabel>{`Type ${confirmInput} below to confirm.`}</InputLabel>
              <StyledInput onChange={handleConfirmInputChange} />
              <br />
            </>
          )}
          <StyledButton hollow onClick={modal.close}>
            {cancelText}
          </StyledButton>
          <StyledButton
            color={type}
            disabled={confirmInput && !isConfirmEnabled}
            working={isWorking}
            onClick={() => handleConfirm(modal)}
          >
            {confirmText}
          </StyledButton>
        </>
      )}
    />
  );
};

ConfirmModal.propTypes = propTypes;
ConfirmModal.defaultProps = defaultProps;

export default ConfirmModal;
