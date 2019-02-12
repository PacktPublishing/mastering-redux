import React from 'react';
import { connect } from 'react-redux';
import ColumnItem from 'components/ColumnItem/ColumnItem';
import { addTeam, setActiveTeam, updateTeamName } from 'src/team/team';
import { createMemberAndDetails, updateMemberName } from 'src/member/member';
import { setActiveLeague, updateLeagueName } from 'src/league/league';
import debounce from 'lodash/debounce';
import { withCacheContext } from 'components/Cache';

function mapStateToProps(state, ownProps) {
  const { type, items } = ownProps.data;
  const id = items[ownProps.index];
  const item = ownProps.cache.get(`${type}s`, id);
  const activeId = state[type].active;
  return { item, type, id, activeId };
}

const mapDispatchToProps = {
  addTeam,
  setActiveTeam,
  updateTeamName,
  setActiveLeague,
  updateLeagueName,
  updateMemberName,
  addMember: createMemberAndDetails
};

class ColumnItemContainer extends React.PureComponent {
  addItem = (item, type) => {
    const { addMember, addTeam, cache } = this.props;

    if (type === 'team') {
      addMember({ teamId: item.id }, cache);
    } else if (type === 'league') {
      addTeam({ leagueId: item.id }, cache);
    }
  };

  setActiveItem = (item, type) => {
    if (type === 'team') {
      this.props.setActiveTeam(item);
    } else if (type === 'league') {
      this.props.setActiveLeague(item);
    }
  };

  updateName = debounce((name, item, type) => {
    const { cache } = this.props;
    if (type === 'member') {
      this.props.updateMemberName(name, item.id, cache);
    } else if (type === 'team') {
      this.props.updateTeamName(name, item.id, cache);
    } else if (type === 'league') {
      this.props.updateLeagueName(name, item.id, cache);
    }
  }, 700);

  render() {
    return (
      <ColumnItem
        {...this.props}
        key={this.props.type + this.props.id}
        updateName={this.updateName}
        addItem={this.props.type !== 'member' && this.addItem}
        setActiveItem={this.props.type !== 'member' && this.setActiveItem}
      />
    );
  }
}

export default withCacheContext(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ColumnItemContainer)
);
