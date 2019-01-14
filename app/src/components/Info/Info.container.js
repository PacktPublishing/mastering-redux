import React from 'react';
import { connect } from 'react-redux';
import Info from 'components/Info/Info';
import { getInfoDetails, getLocationPayload } from 'selectors';
import { patchDetailsEntry } from 'details/details';
import { getMemberData } from 'member/member';

const mapStateToProps = state => {
  const { id, level } = getLocationPayload(state);
  return {
    id,
    name: level,
    details: getInfoDetails(state)
  }
};

const mapDispatchToProps = {
  getMemberData,
  edit: patchDetailsEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
