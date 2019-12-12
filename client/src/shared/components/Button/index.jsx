import React from 'react';
import PropTypes from 'prop-types';

import { color } from 'shared/utils/styles';
import Icon from 'shared/components/Icon';
import { StyledButton, StyledSpinner } from './Styles';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'secondary', 'empty']),
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  disabled: PropTypes.bool,
  working: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  children: undefined,
  color: 'secondary',
  icon: undefined,
  iconSize: 18,
  disabled: false,
  working: false,
  onClick: () => {},
};

const Button = ({
  children,
  color: propsColor,
  icon,
  iconSize,
  disabled,
  working,
  onClick = () => {},
  ...buttonProps
}) => (
  <StyledButton
    {...buttonProps}
    onClick={() => {
      if (!disabled && !working) {
        onClick();
      }
    }}
    color={propsColor}
    disabled={disabled || working}
    working={working}
    iconOnly={!children}
  >
    {working && (
      <StyledSpinner
        iconOnly={!children}
        size={26}
        color={propsColor === 'primary' ? '#fff' : color.textDark}
      />
    )}
    {!working && icon && (
      <Icon
        type={icon}
        size={iconSize}
        color={propsColor === 'primary' ? '#fff' : color.textDark}
      />
    )}
    <div>{children}</div>
  </StyledButton>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
