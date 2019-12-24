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
  value: undefined,
};

const DatePickerTimeSection = ({ value, onChange, setDropdownOpen }) => {
  const $sectionRef = useRef();

  useLayoutEffect(() => {
    scrollToSelectedTime($sectionRef.current, value);
  }, [value]);

  const handleTimeChange = newTime => {
    const [newHour, newMinute] = newTime.split(':');

    const existingDateWithNewTime = moment(value).set({
      hour: Number(newHour),
      minute: Number(newMinute),
    });
    onChange(formatDateTimeForAPI(existingDateWithNewTime));
    setDropdownOpen(false);
  };

  return (
    <TimeSection ref={$sectionRef}>
      {generateTimes().map(time => (
        <Time
          key={time}
          data-time={time}
          isSelected={time === formatTime(value)}
          onClick={() => handleTimeChange(time)}
        >
          {time}
        </Time>
      ))}
    </TimeSection>
  );
};

const formatTime = value => formatDate(value, 'HH:mm');

const scrollToSelectedTime = ($scrollCont, value) => {
  if (!$scrollCont) return;

  const $selectedTime = $scrollCont.querySelector(`[data-time="${formatTime(value)}"]`);
  if (!$selectedTime) return;

  $scrollCont.scrollTop = $selectedTime.offsetTop - 80;
};

const generateTimes = () =>
  range(48).map(i => {
    const hour = `${Math.floor(i / 2)}`;
    const paddedHour = hour.length < 2 ? `0${hour}` : hour;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${paddedHour}:${minute}`;
  });

DatePickerTimeSection.propTypes = propTypes;
DatePickerTimeSection.defaultProps = defaultProps;

export default DatePickerTimeSection;
