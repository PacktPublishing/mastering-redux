import React  from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { type, routesMap } = state.location;
  return { route: routesMap[type] };
};

class Router extends React.PureComponent {
  state = {
    Page: null,
    currentPage: null
  };

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.route !== this.props.route) {
      this.loadPage();
    }
  }

  loadPage() {
    const { route } = this.props;
    import(`components/${route.page}.js`)
      .then(module => this.setState({
        Page: module.default,
        currentPage: route.page
      }));
  }

  render() {
    const { Page, currentPage } = this.state;
    const { route } = this.props;
    if (currentPage !== route.page) return null;
    return (<Page />);
  }
}

export default connect(mapStateToProps)(Router);
