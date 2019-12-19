export const is = {
  match: (testFn, message = '') => (value, fieldValues) => !testFn(value, fieldValues) && message,

  required: () => value => isNilOrEmptyString(value) && 'This field is required',

  minLength: min => value => !!value && value.length < min && `Must be at least ${min} characters`,

  maxLength: max => value => !!value && value.length > max && `Must be at most ${max} characters`,

  notEmptyArray: () => value =>
    Array.isArray(value) && value.length === 0 && 'Please add at least one item',

  email: () => value => !!value && !/.+@.+\..+/.test(value) && 'Must be a valid email',

  url: () => value =>
    !!value &&
    // eslint-disable-next-line no-useless-escape
    !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value) &&
    'Must be a valid URL',
};

const isNilOrEmptyString = value => value === undefined || value === null || value === '';

export const generateErrors = (fieldValues, fieldValidators) => {
  const errors = {};

  Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
    [validators].flat().forEach(validator => {
      const errorMessage = validator(fieldValues[fieldName], fieldValues);
      if (errorMessage && !errors[fieldName]) {
        errors[fieldName] = errorMessage;
      }
    });
  });
  return errors;
};
