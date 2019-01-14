import React from 'react';
import { PanelTitle } from 'components/UI';
import Details from 'components/Details';

function Info(props) {
  const { name, id, details, edit } = props;
  return (
    <React.Fragment>
      <PanelTitle>{name} – {id}</PanelTitle>
      {details &&
        <Details id={id} details={details} edit={edit} />
      }
    </React.Fragment>
  );
}

export default Info;
