import { connectRoutes } from 'redux-first-router';
import Panels from 'components/Panels.container';
import Info from 'components/Info.container';

export const routesMap = {
  HOME_ROUTE: {
    path: '/',
    page: Panels
  },
  INFO_ROUTE: {
    path: '/:level/:id/info',
    page: Info
  }
};

const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer
} = connectRoutes(routesMap);

export { locationReducer, locationMiddleware, locationEnhancer };
