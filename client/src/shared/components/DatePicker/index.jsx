import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { formatDate, formatDateTime } from 'shared/utils/dateTime';
import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import Input from 'shared/components/Input';

import DateSection from './DateSection';
import TimeSection from './TimeSection';
import { StyledDatePicker, Dropdown } from './Styles';

const propTypes = {
  className: PropTypes.string,
  withTime: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  className: undefined,
  withTime: true,
  value: undefined,
};

const DatePicker = ({ className, withTime, value, onChange, ...inputProps }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const $containerRef = useRef();

  useOnOutsideClick($containerRef, isDropdownOpen, () => setDropdownOpen(false));

  return (
    <StyledDatePicker ref={$containerRef}>
      <Input
        icon="calendar"
        {...inputProps}
        className={className}
        autoComplete="off"
        value={getFormattedInputValue(value, withTime)}
        onClick={() => setDropdownOpen(true)}
      />
      {isDropdownOpen && (
        <Dropdown withTime={withTime}>
          <DateSection
            withTime={withTime}
            value={value}
            onChange={onChange}
            setDropdownOpen={setDropdownOpen}
          />
          {withTime && (
            <TimeSection value={value} onChange={onChange} setDropdownOpen={setDropdownOpen} />
          )}
        </Dropdown>
      )}
    </StyledDatePicker>
  );
};

const getFormattedInputValue = (value, withTime) => {
  if (!value) return '';
  return withTime ? formatDateTime(value) : formatDate(value);
};

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
