import * as authentication from './controllers/authentication';
import * as users from './controllers/users';

export const attachPublicRoutes = (app: any): void => {
  app.post('/authentication/guest', authentication.createGuestAccount);
};

export const attachPrivateRoutes = (app: any): void => {
  // app.post('/comments', comments.create);
  // app.put('/comments/:commentId', comments.update);
  // app.delete('/comments/:commentId', comments.remove);

  // app.get('/issues', issues.getProjectIssues);
  // app.get('/issues/:issueId', issues.getIssueWithUsersAndComments);
  // app.post('/issues', issues.create);
  // app.put('/issues/:issueId', issues.update);
  // app.delete('/issues/:issueId', issues.remove);

  // app.get('/project', projects.getProjectWithUsersAndIssues);
  // app.put('/project', projects.update);

  app.get('/currentUser', users.getCurrentUser);
};
