import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { getStoredAuthToken, storeAuthToken } from 'shared/utils/authToken';
import { PageLoader } from 'shared/components';

const Authenticate = () => {
  const history = useHistory();

  useEffect(() => {
    if (!getStoredAuthToken()) {
       const createGuestAccount = async () => {
      try {
        const { authToken } = await api.post('/authentication/guest');
        storeAuthToken(authToken);
        history.push('/');
      } catch (error) {
        toast.error(error);
      }
    };
      createGuestAccount();
    }
  }, [history]);

  return <PageLoader />;
};

export default Authenticate;
