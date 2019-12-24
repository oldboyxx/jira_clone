import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import TextareaAutoSize from 'react-textarea-autosize';

import { StyledTextarea } from './Styles';

const propTypes = {
  className: PropTypes.string,
  invalid: PropTypes.bool,
  minRows: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  invalid: false,
  minRows: 2,
  value: undefined,
  onChange: () => {},
};

const Textarea = forwardRef(({ className, invalid, onChange, ...textareaProps }, ref) => (
  <StyledTextarea className={className} invalid={invalid}>
    <TextareaAutoSize
      {...textareaProps}
      onChange={event => onChange(event.target.value, event)}
      inputRef={ref || undefined}
    />
  </StyledTextarea>
));

Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;

export default Textarea;
