import { connectRoutes } from 'redux-first-router';
import Home from 'components/Home';
import Panel from 'components/Panel/Panels.container';
import Info from 'components/Info/Info.container';

export const routesMap = {
  HOME_ROUTE: {
    path: '/',
    component: Home
  },
  PANEL_ROUTE: {
    path: '/app',
    component: Panel
  },
  INFO_ROUTE: {
    path: '/app/:level/:id/info',
    component: Info
  }
};

export default initialEntries =>
  connectRoutes(routesMap, { initialDispatch: false, initialEntries });
