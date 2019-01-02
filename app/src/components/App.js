import React from 'react';
import * as Ui from 'components/UI';
import { Grid } from 'react-styled-flexboxgrid';
import Router from 'components/Router';

function App() {
  return (
    <Ui.Main>
      <Grid fluid>
        <Router/>
        <Ui.Normalizr/>
      </Grid>
    </Ui.Main>
  );
}

export default App;
