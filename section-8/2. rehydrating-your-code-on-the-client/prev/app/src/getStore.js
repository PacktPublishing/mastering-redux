import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import createSagaMiddleware from 'redux-saga';
import reducerRegistry from 'src/reducerRegistry';
import getLocation from 'src/router';
import { rootSaga } from './sagas';

export default (preloadedState, initialEntries) => {
  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const {
    reducer: locationReducer,
    middleware: locationMiddleware,
    enhancer: locationEnhancer,
    initialDispatch: locationStart
  } = getLocation(initialEntries);

  reducerRegistry.register('location', locationReducer);

  const combine = reducers => {
    const reducerNames = Object.keys(reducers);
    if (null) {
      Object.keys({}).forEach(item => {
        if (!reducerNames.includes(item)) {
          reducers[item] = (state = null) => state;
        }
      });
    }
    return combineReducers(reducers);
  };

  const reducer = combine(reducerRegistry.getReducers());

  const sagaMiddleware = createSagaMiddleware();

  const enhancer = composeEnhancers(
    locationEnhancer,
    applyMiddleware(
      locationMiddleware,
      sagaMiddleware,
      reduxPackMiddleware
      // loggerMiddleware
    )
  );

  // const middlewareEnhancer = applyMiddleware(locationMiddleware, reduxPackMiddleware, loggerMiddleware);
  // const enhancer = cs => locationEnhancer(middlewareEnhancer(localStorageEnhancer(cs)));

  const store = createStore(reducer, preloadedState, enhancer);
  sagaMiddleware.run(rootSaga);
  locationStart();

  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combine(reducers));
  });

  return store;
};
