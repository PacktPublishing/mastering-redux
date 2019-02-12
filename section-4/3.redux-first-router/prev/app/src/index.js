import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/App.container';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import team from 'team';
import member from 'member';
import league from 'league';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducer = combineReducers({
  team,
  member,
  league
});

const store = createStore(
  reducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

