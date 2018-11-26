import React from 'react';
import { Col } from "react-styled-flexboxgrid";
import * as Ui from 'components/UI';

function Column(props) {
  const { type, items, name, addItem, setActiveItem } = props;
  return (
    <Col xs={4}>
      <Ui.PanelTitle>{name}</Ui.PanelTitle>
      <Ui.Panel>
        {
          items
            .map((item) => (
              <Ui.PanelBox key={item.id} disabled={!addItem && !setActiveItem}>
                <Ui.PanelInput type="text" defaultValue={item.name} disabled/>
                {setActiveItem &&
                  <Ui.Button onClick={() => setActiveItem(item, type)}>Open</Ui.Button>
                }
                {addItem &&
                  <Ui.Button onClick={() => addItem(item, type)}>Add more</Ui.Button>
                }
              </Ui.PanelBox>
            ))
        }
      </Ui.Panel>
    </Col>
  );
}

export default Column;
