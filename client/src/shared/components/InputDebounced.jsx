import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { Input } from 'shared/components';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  value: undefined,
};

const InputDebounced = ({ onChange, value: propsValue, ...inputProps }) => {
  const [value, setValue] = useState(propsValue);
  const isControlled = propsValue !== undefined;

  const handleChange = useCallback(
    debounce(newValue => onChange(newValue), 500),
    [],
  );

  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (propsValue !== valueRef.current) {
      setValue(propsValue);
    }
  }, [propsValue]);

  return (
    <Input
      {...inputProps}
      value={isControlled ? value : undefined}
      onChange={newValue => {
        setValue(newValue);
        handleChange(newValue);
      }}
    />
  );
};

InputDebounced.propTypes = propTypes;
InputDebounced.defaultProps = defaultProps;

export default InputDebounced;
