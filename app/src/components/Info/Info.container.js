import React from 'react';
import { connect } from 'react-redux';
import Info from 'components/Info/Info';
import { getInfoDetails, getLocationPayload } from 'src/selectors';
import { patchDetailsEntry } from 'src/details/details';
import { getMemberData } from 'src/member/member';

const mapStateToProps = state => {
  const { payload } = state.location;
  return {
    id: payload.id,
    name: payload.level,
    details: getInfoDetails(payload)
  };
};

const mapDispatchToProps = {
  getMemberData,
  edit: patchDetailsEntry
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
