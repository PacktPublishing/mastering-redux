import '@babel/polyfill';
import React from 'react';
import Cache from './components/Cache';
import App from './components/App';
import { Provider } from 'react-redux';

export default (store, cache) => (
  <Provider store={store}>
    <Cache cache={cache}>
      <App />
    </Cache>
  </Provider>
);
