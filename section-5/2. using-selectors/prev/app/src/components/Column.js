import { Col } from 'react-styled-flexboxgrid';
import * as Ui from 'components/UI';
import React from 'react';
import ColumnItem from 'components/ColumnItem.container';

function Column(props) {
  const { type, items, name } = props;
  return (
    <Col xs={4}>
      <Ui.PanelTitle>{name}</Ui.PanelTitle>
      <Ui.Panel>
        {items.map(item => <ColumnItem key={item} id={item} type={type} /> )}
      </Ui.Panel>
    </Col>
  );
}

export default Column;
