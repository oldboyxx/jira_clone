import { get } from 'lodash';

import useApi from 'shared/hooks/api';

const useCurrentUser = ({ cachePolicy = 'cache-only' } = {}) => {
  const [{ data }] = useApi.get('/currentUser', {}, { cachePolicy });

  return {
    // TODO: fix this
    currentUser: { id: 1, }, // get(data, 'currentUser'),
    // TODO: fix this
    currentUserId: 1, // get(data, 'currentUser.id'),
  };
};

export default useCurrentUser;
