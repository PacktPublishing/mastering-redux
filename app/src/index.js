import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducerRegistry from 'reducerRegistry';
import { locationReducer, locationMiddleware, locationEnhancer } from 'router';
import { loggerMiddleware, localStorageEnhancer } from 'store-utils';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

reducerRegistry.register('location', locationReducer);

const rehydratedState = localStorageEnhancer.getLocalStorageState();

const combine = (reducers) => {
  const reducerNames = Object.keys(reducers);
  if (rehydratedState) {
    Object.keys(rehydratedState).forEach(item => {
      if (!reducerNames.includes(item)) {
        reducers[item] = (state = null) => state;
      }
    });
  }
  return combineReducers(reducers);
};

const reducer = combine(reducerRegistry.getReducers());

const enhancer = composeEnhancers(locationEnhancer, applyMiddleware(locationMiddleware, thunk, loggerMiddleware), localStorageEnhancer);

// const middlewareEnhancer = applyMiddleware(locationMiddleware, thunk, loggerMiddleware);
// const enhancer = cs => locationEnhancer(middlewareEnhancer(localStorageEnhancer(cs)));

const store = createStore(
  reducer,
  rehydratedState,
  enhancer
);

reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

