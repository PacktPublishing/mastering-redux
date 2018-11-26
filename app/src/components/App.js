import React from 'react';
import { Grid, Row } from 'react-styled-flexboxgrid';
import * as Ui from 'components/UI';
import Column from 'components/Column';

function App(props) {
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
    <React.Fragment>
      <Ui.Main>
        <Grid fluid>
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
        </Grid>
      </Ui.Main>
      <Ui.Normalizr/>
    </React.Fragment>
  );
}

export default App;
