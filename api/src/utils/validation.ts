type Value = any;
type ErrorMessage = false | string;
type FieldValues = { [key: string]: Value };
type Validator = (value: Value, fieldValues?: FieldValues) => ErrorMessage;
type FieldValidators = { [key: string]: Validator | Validator[] };
type FieldErrors = { [key: string]: string };

const is = {
  match: (testFn: Function, message = '') => (
    value: Value,
    fieldValues: FieldValues,
  ): ErrorMessage => !testFn(value, fieldValues) && message,

  required: () => (value: Value): ErrorMessage =>
    isNilOrEmptyString(value) && 'This field is required',

  minLength: (min: number) => (value: Value): ErrorMessage =>
    !!value && value.length < min && `Must be at least ${min} characters`,

  maxLength: (max: number) => (value: Value): ErrorMessage =>
    !!value && value.length > max && `Must be at most ${max} characters`,

  oneOf: (arr: any[]) => (value: Value): ErrorMessage =>
    !!value && !arr.includes(value) && `Must be one of: ${arr.join(', ')}`,

  notEmptyArray: () => (value: Value): ErrorMessage =>
    Array.isArray(value) && value.length === 0 && 'Please add at least one item',

  email: () => (value: Value): ErrorMessage =>
    !!value && !/.+@.+\..+/.test(value) && 'Must be a valid email',

  url: () => (value: Value): ErrorMessage =>
    !!value &&
    // eslint-disable-next-line no-useless-escape
    !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value) &&
    'Must be a valid URL',
};

const isNilOrEmptyString = (value: Value): boolean =>
  value === undefined || value === null || value === '';

export const generateErrors = (
  fieldValues: FieldValues,
  fieldValidators: FieldValidators,
): FieldErrors => {
  const fieldErrors: FieldErrors = {};

  Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
    [validators].flat().forEach(validator => {
      const errorMessage = validator(fieldValues[fieldName], fieldValues);

      if (errorMessage !== false && !fieldErrors[fieldName]) {
        fieldErrors[fieldName] = errorMessage;
      }
    });
  });
  return fieldErrors;
};

export default is;
