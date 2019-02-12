import React from 'react';
import { PanelTitle } from 'components/UI';
import Details from 'components/Details';

function Info(props) {
  const { name, item: { id, details } = {}, edit } = props;
  return (
    <React.Fragment>
      <PanelTitle>{name}</PanelTitle>
      {details &&
        <Details id={id} details={details} edit={edit} />
      }
    </React.Fragment>
  );
}

export default Info;
