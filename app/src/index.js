import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducerRegistry from 'reducerRegistry';
import { locationReducer, locationMiddleware, locationEnhancer } from 'router';
import { initialState as league } from 'league';
import { initialState as team } from 'team';
import { initialState as member } from 'member';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const initialState = {
  league,
  team,
  member
};
reducerRegistry.register('location', locationReducer);

const combine = (reducers) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers(reducers);
};

const reducer = combine(reducerRegistry.getReducers());

const store = createStore(
  reducer,
  undefined,
  composeEnhancers(
    locationEnhancer,
    applyMiddleware(locationMiddleware, thunk)
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

