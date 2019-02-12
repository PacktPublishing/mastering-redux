import '@babel/polyfill';
import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';

export default store => (
  <Provider store={store}>
    <App />
  </Provider>
);
