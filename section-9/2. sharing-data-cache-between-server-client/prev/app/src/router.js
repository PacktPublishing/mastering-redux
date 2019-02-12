import { connectRoutes } from 'redux-first-router';
import Home from 'components/Home';
import Panel from 'components/Panel/Panels.container';
import Info from 'components/Info/Info.container';
import { getLeagueDataThunk } from 'src/league/league';
import { getTeamDataThunk } from 'src/team/team';
import {
  getMemberDataThunk,
  getMemberAndDetailsThunk
} from 'src/member/member';

const dispatchThunks = (...thunks) => (...params) =>
  Promise.all(thunks.map(thunk => thunk(...params)));

export const routesMap = {
  HOME_ROUTE: {
    path: '/',
    component: Home
  },
  PANEL_ROUTE: {
    path: '/app',
    component: Panel,
    thunk: dispatchThunks(
      getLeagueDataThunk,
      getTeamDataThunk,
      getMemberDataThunk
    )
  },
  INFO_ROUTE: {
    path: '/app/:level/:id/info',
    component: Info,
    thunk: getMemberAndDetailsThunk
  }
};

export default initialEntries => connectRoutes(routesMap, { initialEntries });
