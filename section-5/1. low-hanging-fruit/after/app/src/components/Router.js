import React  from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { type, routesMap } = state.location;
  return { route: routesMap[type] };
};

class Router extends React.PureComponent {
  render() {
    const { route } = this.props;
    const Page = route.page;
    return (<Page />);
  }
}

export default connect(mapStateToProps)(Router);