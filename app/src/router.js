import { connectRoutes } from 'redux-first-router';

export const routesMap = {
  HOME_ROUTE: {
    path: '/',
    page: 'Home'
  },
  PANEL_ROUTE: {
    path: '/app',
    page: 'PanelsContainer'
  },
  INFO_ROUTE: {
    path: '/app/:level/:id/info',
    page: 'InfoContainer'
  }
};

export default initialEntries =>
  connectRoutes(routesMap, { initialDispatch: false, initialEntries });
