import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducerRegistry from 'reducerRegistry';
import { locationReducer, locationMiddleware, locationEnhancer } from 'router';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

reducerRegistry.register('location', locationReducer);

const getRehydratedState = () => {
  const serialized = localStorage.getItem('mastering_redux_app_state');
  return serialized ? JSON.parse(serialized) : undefined;
};

const rehydratedState = getRehydratedState();

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

const loggerMiddleware = store => next => action => {
  console.info('prev state', store.getState());
  console.info('action', action);
  const result = next(action);
  console.info('next state', store.getState());
  return result;
};

const store = createStore(
  reducer,
  rehydratedState,
  composeEnhancers(
    locationEnhancer,
    applyMiddleware(locationMiddleware, thunk, loggerMiddleware)
  )
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

