import React from 'react';
import { connect } from 'react-redux';
import Panels from 'components/Panels';
import { getPanelColumns } from 'selectors';
import { getLeagueData } from 'league';
import { getTeamData } from 'team';
import { getMemberData } from 'member';

const mapStateToProps = state => ({
  columns: getPanelColumns(state)
});

const mapDispatchToProps = {
  getLeagueData,
  getTeamData,
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
