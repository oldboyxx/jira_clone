import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from 'browserHistory';

import PageError from 'shared/components/PageError';
import Project from 'Project';
import Authenticate from './Authenticate';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/project" />
      <Route path="/authenticate" component={Authenticate} />
      <Route path="/project" component={Project} />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
