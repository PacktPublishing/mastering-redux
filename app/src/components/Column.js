import { Col } from 'react-styled-flexboxgrid';
import * as Ui from 'components/UI';
import React, { Component } from 'react';
import ColumnItem from 'components/ColumnItem/ColumnItem.container';
import { FixedSizeList as List } from 'react-window';

class Column extends Component {
  componentDidMount() {
    this.props.getInitialData();
  }

  render() {
    const { items, name, type, loading } = this.props;
    return (
      <Col xs={4}>
        <Ui.PanelHeader>
          <Ui.PanelTitle>{name}</Ui.PanelTitle>
          {loading && <Ui.Spinner />}
        </Ui.PanelHeader>
        <Ui.Panel>
          <List
            itemData={{ type, items }}
            height={300}
            itemCount={items.length}
            itemSize={90}
          >
            {ColumnItem}
          </List>
        </Ui.Panel>
      </Col>
    );
  }
}

export default Column;
