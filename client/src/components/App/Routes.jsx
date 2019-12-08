import React from 'react';
import history from 'browserHistory';
import { Router, Switch, Route } from 'react-router-dom';

import PageNotFound from 'components/PageNotFound';
import NavbarLeft from './NavbarLeft';

import { Main } from './AppStyles';

const Routes = () => (
  <Router history={history}>
    <Main>
      <NavbarLeft />
      <Switch>
        <Route component={PageNotFound} />
      </Switch>
    </Main>
  </Router>
);

export default Routes;
