import { connectRoutes } from 'redux-first-router';

export const routesMap = {
  HOME_ROUTE: {
    path: '/',
    page: 'Home'
  },
  PANEL_ROUTE: {
    path: '/app',
    page: 'Panels.container'
  },
  INFO_ROUTE: {
    path: '/app/:level/:id/info',
    page: 'Info.container'
  }
};

const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer
} = connectRoutes(routesMap);

export { locationReducer, locationMiddleware, locationEnhancer };
