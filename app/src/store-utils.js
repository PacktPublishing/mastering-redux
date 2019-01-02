
export const loggerMiddleware = store => next => action => {
  console.info('prev state', store.getState());
  console.info('action', action);
  const result = next(action);
  console.info('next state', store.getState());
  return result;
};


function createLocaleStorageEnhancer() {
  const STATE_KEY = 'UNIQUE_KEY';

  function getLocalStorageState() {
    const state = localStorage.getItem(STATE_KEY);
    if (state) {
      return JSON.parse(state);
    }
    return undefined;
  }

  function setLocalStorageState(state, action) {
    const newState = JSON.stringify(state);
    console.info(`${action.type} state change ––- saving state to localStorage.`);
    localStorage.setItem(STATE_KEY, newState);
  }

  const localStorageEnhancerFn = createStore => (reducer, preloadedState, enhancer) => {

    const initialState = getLocalStorageState() || preloadedState;

    const store = createStore(reducer, initialState, enhancer);

    return {
      ...store,
      dispatch(action) {
        store.dispatch(action);
        const result = store.getState();
        setLocalStorageState(result, action);
      }
    }
  };

  localStorageEnhancerFn.getLocalStorageState = getLocalStorageState;
  return localStorageEnhancerFn;
}

export const localStorageEnhancer = createLocaleStorageEnhancer();
