import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Icon from 'shared/components/Icon';
import StyledInput from './Styles';

const propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  invalid: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  filter: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func,
};

const defaultProps = {
  icon: undefined,
  className: undefined,
  invalid: false,
  value: undefined,
  filter: undefined,
  onChange: () => {},
};

const Input = forwardRef(({ icon, className, invalid, filter, onChange, ...inputProps }, ref) => {
  const handleChange = event => {
    if (!filter || filter.test(event.target.value)) {
      onChange(event.target.value, event);
    }
  };
  return (
    <StyledInput className={className} icon={icon} invalid={invalid}>
      {icon && <Icon type={icon} size={15} />}
      <input {...inputProps} onChange={handleChange} ref={ref} />
    </StyledInput>
  );
});

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
