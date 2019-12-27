import { get } from 'lodash';

import useApi from 'shared/hooks/api';

const useCurrentUser = ({ cachePolicy = 'cache-only' } = {}) => {
  const [{ data }] = useApi.get('/currentUser', {}, { cachePolicy });

  const currentUser = get(data, 'currentUser');
  const currentUserId = get(data, 'currentUser.id');

  return { currentUser, currentUserId };
};

export default useCurrentUser;
