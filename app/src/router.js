import { connectRoutes } from 'redux-first-router';

export const routesMap = {
  HOME_ROUTE: {
    path: '/',
    page: 'Panels.container'
  },
  INFO_ROUTE: {
    path: '/:level/:id/info',
    page: 'Info.container'
  }
};

const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer
} = connectRoutes(routesMap);

export { locationReducer, locationMiddleware, locationEnhancer };
