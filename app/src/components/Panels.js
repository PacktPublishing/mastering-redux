import React from 'react';
import { Row } from 'react-styled-flexboxgrid';
import Column from 'components/Column';

function Panels(props) {
  const {
    leagues,
    teams,
    members
  } = props;
  const columns = [
    {
      items: leagues,
      type: 'league'
    },
    {
      items: teams,
      type: 'team'
    },
    {
      items: members,
      type: 'member'
    },
  ];

  return (
    <Row>
      {columns.map((col, i) => (
        <Column
          key={col.type}
          type={col.type}
          items={col.items}
          name={`${col.type}s`}
        />
      ))}
    </Row>
  );
}

export default Panels;
