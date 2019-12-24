import useQuery from './query';
import useMutation from './mutation';

/* eslint-disable react-hooks/rules-of-hooks */
export default {
  get: (...args) => useQuery(...args),
  post: (...args) => useMutation('post', ...args),
  put: (...args) => useMutation('put', ...args),
  patch: (...args) => useMutation('patch', ...args),
  delete: (...args) => useMutation('delete', ...args),
};
