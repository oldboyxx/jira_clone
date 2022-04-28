import * as authentication from './controllers/authentication';
import * as users from './controllers/users';

export const attachPublicRoutes = (app: any): void => {
  app.post('/authentication/guest', authentication.createGuestAccount);
};

