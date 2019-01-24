import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { type, routesMap } = state.location;
  return { route: routesMap[type] };
};

function Router(props) {
  const { route } = props;
  const Page = route.component;
  return <Page />;
}

export default connect(mapStateToProps)(Router);
