import React from 'react';
import { connect } from 'react-redux';
import ColumnItem from 'components/ColumnItem';
import { addTeam, setActiveTeam, updateTeamName } from 'team';
import { addMember, editDetailsEntry, updateMemberName } from 'member';
import { setActiveLeague, updateLeagueName } from 'league';

function mapStateToProps(state, ownProps) {
  const item = state[ownProps.type].data[ownProps.id];
  return { item };
}

const mapDispatchToProps = {
  addTeam,
  addMember,
  setActiveTeam,
  updateTeamName,
  setActiveLeague,
  updateLeagueName,
  updateMemberName,
  editDetailsEntry
};

class ColumnItemContainer extends React.PureComponent {
  addItem = (item, type) => {
    const { addMember, addTeam } = this.props;

    if (type === 'team') {
      addMember({ teamId: item.id });
    } else if (type === 'league') {
      addTeam({ leagueId: item.id });
    }
  };

  setActiveItem = (item, type) => {
    if (type === 'team') {
      this.props.setActiveTeam(item);
    } else if (type === 'league') {
      this.props.setActiveLeague(item);
    }
  };

  updateName = (name, item, type) => {
    if (type === 'member') {
      this.props.updateMemberName(name, item.id);
    } else if (type === 'team') {
      this.props.updateTeamName(name, item.id);
    } else if (type === 'league') {
      this.props.updateLeagueName(name, item.id);
    }
  };

  render() {
    return (
      <ColumnItem
        {...this.props}
        updateName={this.updateName}
        addItem={this.props.type !== 'member' && this.addItem}
        setActiveItem={this.props.type !== 'member' && this.setActiveItem}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnItemContainer);