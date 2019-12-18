import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { Input } from 'shared/components';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const InputDebounced = ({ onChange, value: propsValue, ...props }) => {
  const [value, setValue] = useState(propsValue);

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
      {...props}
      value={value}
      onChange={newValue => {
        setValue(newValue);
        handleChange(newValue);
      }}
    />
  );
};

InputDebounced.propTypes = propTypes;

export default InputDebounced;
