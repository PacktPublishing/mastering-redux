import React from 'react';
import { PanelTitle, Link } from 'components/UI';
function Home(props) {
  return (
    <div>
      <PanelTitle>
        Welcome to Mastering Redux
      </PanelTitle>
      <Link to={{ type: 'PANEL_ROUTE' }}>
        start
      </Link>
    </div>
  );
}

export default Home;
