import React from 'react';

import Toast from './Toast';
import Routes from './Routes';
import NormalizeStyles from './NormalizeStyles';
import FontStyles from './FontStyles';
import BaseStyles from './BaseStyles';

const App = () => (
  <>
    <NormalizeStyles />
    <FontStyles />
    <BaseStyles />
    <Toast />
    <Routes />
  </>
);

export default App;
