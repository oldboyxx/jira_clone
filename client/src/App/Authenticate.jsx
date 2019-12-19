import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import toast from 'shared/utils/toast';
import api from 'shared/utils/api';
import { getStoredAuthToken, storeAuthToken } from 'shared/utils/authToken';
import { PageLoader } from 'shared/components';

const Authenticate = () => {
  const history = useHistory();

  useEffect(() => {
    const createGuestAccount = async () => {
      if (!getStoredAuthToken()) {
        try {
          const { authToken } = await api.post('/authentication/guest');
          storeAuthToken(authToken);
          history.push('/');
        } catch (error) {
          toast.error(error);
        }
      }
    };
    createGuestAccount();
  }, [history]);

  return <PageLoader />;
};

export default Authenticate;
