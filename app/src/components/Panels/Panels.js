import React from 'react';
import { Row } from 'react-styled-flexboxgrid';
import Column from 'components/Column';

function Panels(props) {
  const {
    columns,
    getInitialData
  } = props;
  return (
    <Row>
      {columns.map(col => (
        <Column
          {...col}
          key={col.type}
          name={`${col.type}s`}
          getInitialData={getInitialData[col.type]}
        />
      ))}
    </Row>
  );
}

export default Panels;
