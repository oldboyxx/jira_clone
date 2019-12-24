import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import Input from 'shared/components/Input';
import Select from 'shared/components/Select';
import Textarea from 'shared/components/Textarea';
import TextEditor from 'shared/components/TextEditor';
import DatePicker from 'shared/components/DatePicker';

import { StyledField, FieldLabel, FieldTip, FieldError } from './Styles';

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  tip: PropTypes.string,
  error: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  label: null,
  tip: null,
  error: null,
};

const generateField = FormComponent => {
  const FieldComponent = ({ className, label, tip, error, ...otherProps }) => {
    const fieldId = uniqueId('form-field-');
    return (
      <StyledField className={className} hasLabel={!!label}>
        {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
        <FormComponent id={fieldId} invalid={!!error} {...otherProps} />
        {tip && <FieldTip>{tip}</FieldTip>}
        {error && <FieldError>{error}</FieldError>}
      </StyledField>
    );
  };

  FieldComponent.propTypes = propTypes;
  FieldComponent.defaultProps = defaultProps;

  return FieldComponent;
};

export default {
  Input: generateField(Input),
  Select: generateField(Select),
  Textarea: generateField(Textarea),
  TextEditor: generateField(TextEditor),
  DatePicker: generateField(DatePicker),
};
