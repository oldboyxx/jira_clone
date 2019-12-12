import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import { getStoredAuthToken, storeAuthToken } from 'shared/utils/authToken';
import { PageLoader } from 'shared/components';

const Authenticate = () => {
  const [{ data }, createGuestAccount] = useApi.post('/authentication/guest');

  const history = useHistory();

  useEffect(() => {
    if (!getStoredAuthToken()) {
      createGuestAccount();
    }
  }, [createGuestAccount]);

  useEffect(() => {
    if (data && data.authToken) {
      storeAuthToken(data.authToken);
      history.push('/');
    }
  }, [data, history]);

  return <PageLoader />;
};

export default Authenticate;
