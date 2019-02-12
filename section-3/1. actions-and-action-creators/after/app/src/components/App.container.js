import { connect } from 'react-redux';
import App from 'components/App';
import { addItem, setActiveItem, addTeam, addMember } from 'team';

const mapStateToProps = (state) => {
  const {
    teams,
      leagues,
      members,
      active_team: activeTeam,
      active_league: activeLeague
  } = state;
  return {
    teams,
    leagues,
    members,
    activeTeam,
    activeLeague
  };
};

const mapDispatchToProps = {
  addItem,
  addTeam,
  addMember,
  setActiveItem
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
