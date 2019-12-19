import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { range } from 'lodash';

import { formatDate, formatDateTimeForAPI } from 'shared/utils/dateTime';
import { TimeSection, Time } from './Styles';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  setDropdownOpen: PropTypes.func.isRequired,
};

const defaultProps = {
  value: null,
};

const DatePickerTimeSection = ({ value, onChange, setDropdownOpen }) => {
  const $sectionRef = useRef();
  const formattedTimeValue = formatDate(value, 'HH:mm');

  useLayoutEffect(() => {
    const scrollToSelectedTime = () => {
      if (!$sectionRef.current) return;

      const $selectedTime = $sectionRef.current.querySelector(
        `[data-time="${formattedTimeValue}"]`,
      );
      if (!$selectedTime) return;

      $sectionRef.current.scrollTop = $selectedTime.offsetTop - 80;
    };
    scrollToSelectedTime();
  }, [formattedTimeValue]);

  const handleTimeChange = newTime => {
    const [newHour, newMinute] = newTime.split(':');
    const existingDate = moment(value || undefined);

    const existingDateWithNewTime = existingDate.set({
      hour: Number(newHour),
      minute: Number(newMinute),
    });
    onChange(formatDateTimeForAPI(existingDateWithNewTime));
    setDropdownOpen(false);
  };

  const generateTimes = () =>
    range(48).map(i => {
      const hour = `${Math.floor(i / 2)}`;
      const paddedHour = hour.length < 2 ? `0${hour}` : hour;
      const minute = i % 2 === 0 ? '00' : '30';
      return `${paddedHour}:${minute}`;
    });

  return (
    <TimeSection ref={$sectionRef}>
      {generateTimes().map(time => (
        <Time
          key={time}
          data-time={time}
          isSelected={time === formattedTimeValue}
          onClick={() => handleTimeChange(time)}
        >
          {time}
        </Time>
      ))}
    </TimeSection>
  );
};

DatePickerTimeSection.propTypes = propTypes;
DatePickerTimeSection.defaultProps = defaultProps;

export default DatePickerTimeSection;
