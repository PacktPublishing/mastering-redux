import React from 'react';
import { connect } from 'react-redux';
import Panels from 'components/Panel/Panels';
import { getPanelColumns } from 'src/selectors';
import { getLeagueData } from 'src/league/league';
import { getTeamData } from 'src/team/team';
import { getMemberData } from 'src/member/member';

const mapStateToProps = state => ({
  columns: getPanelColumns(state)
});

const mapDispatchToProps = {
  getTeamData,
  getLeagueData,
  getMemberData
};

class PanelsContainer extends React.PureComponent {
  getInitialData = {
    league: this.props.getLeagueData,
    team: this.props.getTeamData,
    member: this.props.getMemberData
  };

  render() {
    return (
      <Panels
        columns={this.props.columns}
        getInitialData={this.getInitialData}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelsContainer);
