import React from 'react';

const CacheContext = React.createContext();

function Cache(props) {
  return (
    <CacheContext.Provider value={props.cache}>
      {props.children}
    </CacheContext.Provider>
  );
}

function withCacheContext(Component) {
  class WrappedComponent extends React.Component {
    static contextType = CacheContext;

    render() {
      return <Component {...this.props} cache={this.context} />;
    }
  }
  return WrappedComponent;
}

export default Cache;
export { withCacheContext };
