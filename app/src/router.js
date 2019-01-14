import { connectRoutes } from 'redux-first-router';

export const routesMap = {
  HOME_ROUTE: {
    path: '/',
    page: 'Home'
  },
  PANEL_ROUTE: {
    path: '/app',
    page: 'Panels/Panels.container'
  },
  INFO_ROUTE: {
    path: '/app/:level/:id/info',
    page: 'Info/Info.container'
  }
};

const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
  initialDispatch: locationStart
} = connectRoutes(routesMap, { initialDispatch: false });

export { locationReducer, locationMiddleware, locationEnhancer, locationStart };
