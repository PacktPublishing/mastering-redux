import React from 'react';
import * as Ui from 'components/UI';

function ColumnItem(props) {
  const { type, item, addItem, setActiveItem, updateName } = props;
  return (
    <Ui.PanelBox disabled={!addItem && !setActiveItem}>
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
      <Ui.Link
        to={{ type: 'INFO_ROUTE', payload: { level: type, id: item.id } }}
      >
        Info
      </Ui.Link>
    </Ui.PanelBox>
  );
}

export default ColumnItem;