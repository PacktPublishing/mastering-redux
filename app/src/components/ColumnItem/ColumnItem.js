import React from 'react';
import * as Ui from 'components/UI';

function ColumnItem(props) {
  const {
    type,
    item,
    addItem,
    setActiveItem,
    updateName,
    style,
    activeId
  } = props;
  const isActive = activeId === item.id;
  return (
    <Ui.PanelBox
      disabled={!addItem && !setActiveItem}
      style={style}
      active={isActive}
    >
      <Ui.PanelInput
        type="text"
        defaultValue={item.name}
        active={isActive}
        onChange={e => updateName(e.target.value, item, type)}
      />
      {setActiveItem && (
        <Ui.Button onClick={() => setActiveItem(item, type)} active={isActive}>
          Open
        </Ui.Button>
      )}
      {addItem && (
        <Ui.Button onClick={() => addItem(item, type)} active={isActive}>
          Add more
        </Ui.Button>
      )}
      <Ui.Link
        active={isActive}
        to={{ type: 'INFO_ROUTE', payload: { level: type, id: item.id } }}
      >
        Info
      </Ui.Link>
    </Ui.PanelBox>
  );
}

export default React.memo(ColumnItem);
