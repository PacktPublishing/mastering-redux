import React from 'react';
import { connect } from 'react-redux';
import Info from 'components/Info/Info';
import { getInfoDetails, getLocationPayload } from 'src/selectors';
import { patchDetailsEntry } from 'src/details/details';
import { getMemberData } from 'src/member/member';
import { withCacheContext } from 'components/Cache';

const mapStateToProps = (state, ownProps) => {
  const { payload } = state.location;
  return {
    id: payload.id,
    name: payload.level,
    details: getInfoDetails(payload, ownProps.cache)
  };
};

const mapDispatchToProps = {
  getMemberData,
  edit: patchDetailsEntry
};

export default withCacheContext(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Info)
);
