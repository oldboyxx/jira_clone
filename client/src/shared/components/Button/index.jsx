import React from 'react';
import PropTypes from 'prop-types';

import { color } from 'shared/utils/styles';
import Icon from 'shared/components/Icon';
import { StyledButton, StyledSpinner } from './Styles';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  hollow: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'success', 'danger']),
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  disabled: PropTypes.bool,
  working: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  children: undefined,
  type: 'button',
  hollow: false,
  color: 'primary',
  icon: undefined,
  iconSize: undefined,
  disabled: false,
  working: false,
  onClick: () => {},
};

const Button = ({
  children,
  hollow,
  icon,
  iconSize,
  disabled,
  working,
  onClick = () => {},
  ...buttonProps
}) => (
  <StyledButton
    {...buttonProps}
    hollow={hollow}
    onClick={() => {
      if (!disabled && !working) {
        onClick();
      }
    }}
    disabled={disabled || working}
    working={working}
    iconOnly={!children}
  >
    {working && <StyledSpinner size={26} color={hollow ? color.textMediumBlue : '#fff'} />}
    {!working && icon && (
      <Icon type={icon} size={iconSize} color={hollow ? color.textMediumBlue : '#fff'} />
    )}
    {children}
  </StyledButton>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
