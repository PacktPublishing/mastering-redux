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
    setActiveItem
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

  return (
    <React.Fragment>
      <Ui.Main>
        <Grid fluid>
          <Row>
            {columns.map((col, i) => (
              <Column
                {...col}
                key={col.name}
                type={col.name.toLowerCase()}
                updateName={updateName}
                setActiveItem={i < columns.length - 1 && setActiveItem}
                addItem={i < columns.length - 1 && addItem}
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
