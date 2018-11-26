import React from 'react';
import { PanelTitle } from 'components/UI';
import Details from 'components/Details';

function Info(props) {
  const { name, item: { id, details } = {} } = props;
  return (
    <React.Fragment>
      <PanelTitle>{name}</PanelTitle>
      {details &&
        <Details id={id} details={details}/>
      }
    </React.Fragment>
  );
}

export default Info;