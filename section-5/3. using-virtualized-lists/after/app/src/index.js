import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import team from 'team';
import member from 'member';
import league from 'league';

import { locationReducer, locationMiddleware, locationEnhancer } from 'router';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducer = combineReducers({
  location: locationReducer,
  team,
  member,
  league
});

const store = createStore(
  reducer,
  undefined,
  composeEnhancers(
    locationEnhancer,
    applyMiddleware(locationMiddleware, thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

