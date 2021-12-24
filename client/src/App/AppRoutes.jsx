import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import Authenticate from 'Auth/Authenticate';
import PageError from 'shared/components/PageError';

const AppRoutes = function () {
  return (
    <Router location={history.location} history={history}>
      <Switch>
        <Redirect exact path="/" to="/project" />
        <Route path="/authenticate" component={Authenticate} />
        <Route path="/project" component={Project} />
        <Route component={PageError} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
