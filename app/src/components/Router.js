import React from 'react';
import { connect } from 'react-redux';
import universal from 'react-universal-component';

const mapStateToProps = state => {
  const { type, routesMap } = state.location;
  return { route: routesMap[type] };
};

const UniversalComponent = universal(props =>
  import(`components/${props.page}`)
);

function Router(props) {
  const { route } = props;
  return <UniversalComponent page={route.page} />;
}

export default connect(mapStateToProps)(Router);
