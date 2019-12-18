import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { color } from 'shared/utils/styles';
import Icon from 'shared/components/Icon';
import { StyledButton, StyledSpinner } from './Styles';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'secondary', 'empty', 'success', 'danger']),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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

const Button = forwardRef(
  (
    {
      children,
      color: propsColor,
      icon,
      iconSize,
      disabled,
      working,
      onClick = () => {},
      ...buttonProps
    },
    ref,
  ) => {
    const handleClick = () => {
      if (!disabled && !working) {
        onClick();
      }
    };
    const renderSpinner = () => (
      <StyledSpinner
        iconOnly={!children}
        size={26}
        color={propsColor === 'primary' ? '#fff' : color.textDark}
      />
    );
    const renderIcon = () => (
      <Icon
        type={icon}
        size={iconSize}
        color={propsColor === 'primary' ? '#fff' : color.textDark}
      />
    );
    return (
      <StyledButton
        {...buttonProps}
        onClick={handleClick}
        color={propsColor}
        disabled={disabled || working}
        working={working}
        iconOnly={!children}
        ref={ref}
      >
        {working && renderSpinner()}
        {!working && icon && (typeof icon !== 'string' ? icon : renderIcon())}
        <div>{children}</div>
      </StyledButton>
    );
  },
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
