import React from 'react';
import { connect } from 'react-redux';
import universal from 'react-universal-component';

const mapStateToProps = state => {
  const { type, routesMap } = state.location;
  return { route: routesMap[type] };
};

const Universal = universal(props => import(`./${props.page}`));

function Router(props) {
  const { route } = props;
  return <Universal page={route.page} />;
}

export default connect(mapStateToProps)(Router);
