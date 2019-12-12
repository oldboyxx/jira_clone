import axios from 'axios';

import history from 'browserHistory';
import { objectToQueryString } from 'shared/utils/url';
import { getStoredAuthToken, removeStoredAuthToken } from 'shared/utils/authToken';

const defaults = {
  baseURL: 'http://localhost:3000',
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
  },
};

const api = (method, url, paramsOrData) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? paramsOrData : undefined,
      data: method !== 'get' ? paramsOrData : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      response => {
        resolve(response.data);
      },
      error => {
        if (error.response) {
          if (error.response.data.error.code === 'INVALID_TOKEN') {
            removeStoredAuthToken();
            history.push('/authenticate');
          } else {
            reject(error.response.data.error);
          }
        } else {
          reject(defaults.error);
        }
      },
    );
  });

export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args),
};
