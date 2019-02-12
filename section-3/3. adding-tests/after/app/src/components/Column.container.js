import React from'react';
import TeamContext from 'TeamContext';
import Column from 'components/Column';

class ColumnContainer extends React.PureComponent {
  static contextType = TeamContext;

  getItems() {
    const { type } = this.props;
    const items = this.context[type] || [];
    switch (type) {
      case 'leagues': {
        return items;
      }
      case 'teams': {
        return items.filter(t => t.leagueId === this.context.activeLeague)
      }
      case 'members': {
        return items.filter(m => m.teamId === this.context.activeTeam);
      }
      default:
        return [];
    }
  }

  render() {
    return (
      <Column {...this.props} items={this.getItems()} />
    );
  }
}

export default ColumnContainer;