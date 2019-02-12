import React from 'react';
import { Row } from 'react-styled-flexboxgrid';
import Column from 'components/Column';

function Panels(props) {
  const {
    leagues,
    teams,
    members,
    addItem,
    updateName,
    activeTeam,
    activeLeague,
    setActiveItem,
    editDetailsEntry
  } = props;
  const columns = [
    {
      items: leagues,
      name: 'Leagues'
    },
    {
      items: teams.filter(t => t.leagueId === activeLeague),
      name: 'Teams'
    },
    {
      items: members.filter(m => m.teamId === activeTeam),
      name: 'Members'
    },
  ];

  const isLastColumn = index => index < columns.length - 1;

  return (
    <Row>
      {columns.map((col, i) => (
        <Column
          {...col}
          key={col.name}
          updateName={updateName}
          type={col.name.toLowerCase()}
          addItem={isLastColumn(i) && addItem}
          editDetailsEntry={col.name === 'Members' && editDetailsEntry}
          setActiveItem={isLastColumn(i) && setActiveItem}
        />
      ))}
    </Row>
  );
}

export default Panels;
