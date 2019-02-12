import React from 'react';
import { Col } from 'react-styled-flexboxgrid';
import * as Ui from 'components/UI';
import Details from 'components/Details';

function Column(props) {
  const {
    type,
    items,
    name,
    addItem,
    setActiveItem,
    updateName,
    editDetailsEntry
  } = props;
  return (
    <Col xs={4}>
      <Ui.PanelTitle>{name}</Ui.PanelTitle>
      <Ui.Panel>
        {items.map(item => (
          <Ui.PanelBox key={item.id} disabled={!addItem && !setActiveItem}>
            <Ui.PanelInput
              type="text"
              value={item.name}
              onChange={e => updateName(e.target.value, item, type)}
            />
            {setActiveItem && (
              <Ui.Button onClick={() => setActiveItem(item, type)}>
                Open
              </Ui.Button>
            )}
            {addItem && (
              <Ui.Button onClick={() => addItem(item, type)}>
                Add more
              </Ui.Button>
            )}
            {editDetailsEntry && (
              <Details id={item.id} details={item.details} edit={editDetailsEntry} />
            )}
          </Ui.PanelBox>
        ))}
      </Ui.Panel>
    </Col>
  );
}

export default Column;
