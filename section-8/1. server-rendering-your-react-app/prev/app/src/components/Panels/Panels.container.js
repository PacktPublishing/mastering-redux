import React from 'react';
import { connect } from 'react-redux';
import Panels from 'components/Panels/Panels';
import { getPanelColumns } from 'selectors';
import { getLeagueData } from 'league/league';
import { getTeamData } from 'team/team';
import { getMemberData } from 'member/member';

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
