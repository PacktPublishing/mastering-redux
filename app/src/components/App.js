import React from 'react';
import { Grid, Row } from 'react-styled-flexboxgrid';
import * as Ui from 'components/UI';
import ColumnContainer from 'components/Column.container';

function App(props) {
  const {
    addTeam,
    addMember,
    setActiveTeam,
    setActiveLeague
  } = props;
  const columns = [
    { name: 'Leagues', setActiveItem: setActiveLeague, addItem: addTeam, },
    { name: 'Teams', setActiveItem: setActiveTeam, addItem: addMember },
    { name: 'Members' }
  ];
  return (
    <React.Fragment>
      <Ui.Main>
        <Grid>
          <Row>
            {columns.map((col, i) => (
              <ColumnContainer
                {...col}
                key={col.name}
                type={col.name.toLowerCase()}
                setActiveItem={i < columns.length - 1 && col.setActiveItem}
                addItem={i < columns.length - 1 && col.addItem}
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
