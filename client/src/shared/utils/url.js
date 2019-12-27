import queryString from 'query-string';
import { omit } from 'lodash';

export const queryStringToObject = (str, options = {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options,
  });

export const objectToQueryString = (obj, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options,
  });

export const omitFromQueryString = (str, keys) =>
  objectToQueryString(omit(queryStringToObject(str), keys));

export const addToQueryString = (str, fields) =>
  objectToQueryString({
    ...queryStringToObject(str),
    ...fields,
  });
