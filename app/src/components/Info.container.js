import React from 'react';
import { connect } from 'react-redux';
import Info from 'components/Info';
import { getInfoDetails, getLocationPayload } from 'selectors';
import { patchDetailsEntry, getDetailsData } from 'details';
import { getMemberData } from 'member';

const mapStateToProps = state => {
  const { id, level } = getLocationPayload(state);
  const shouldFetchMembers = state.member.data && Object.keys(state.member.data).length === 0;
  return {
    id,
    name: level,
    shouldFetchMembers,
    details: getInfoDetails(state)
  }
};

const mapDispatchToProps = {
  getMemberData,
  getDetailsData,
  edit: patchDetailsEntry
};

class InfoContainer extends React.PureComponent {
  componentDidMount() {
    const { name, details, shouldFetchMembers } = this.props;
    if (name === 'member' && shouldFetchMembers) this.props.getMemberData();
    if (!details) {
      this.props.getDetailsData();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { details } = this.props;
    if (details !== prevProps.details && !details) {
      this.props.getDetailsData();
    }
  }

  render() {
    return (
      <Info
        {...this.props}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);
