import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import reducerRegistry from 'src/reducerRegistry';
import getLocation from 'src/router';

export default async (preloadedState, initialEntries, extra) => {
  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const {
    reducer: locationReducer,
    middleware: locationMiddleware,
    enhancer: locationEnhancer,
    thunk: locationThunk
  } = getLocation(initialEntries, extra);

  reducerRegistry.register('location', locationReducer);

  const reducer = combineReducers(reducerRegistry.getReducers());

  const enhancer = composeEnhancers(
    locationEnhancer,
    applyMiddleware(locationMiddleware, reduxPackMiddleware)
  );

  const store = createStore(reducer, preloadedState, enhancer);

  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combineReducers(reducers));
  });

  if (typeof window === 'undefined') {
    await locationThunk(store);
  }
  return store;
};
