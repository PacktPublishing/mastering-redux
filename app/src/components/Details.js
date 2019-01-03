import React from 'react';
import styled from 'styled-components';
import * as Ui from 'components/UI';

class Details extends React.PureComponent {
  static filterDetails([key = '']) {
    if (key !== 'id') return !key.startsWith('_');
    return false;
  }

  onChange = e => {
    const { edit, id } = this.props;
    edit({ name: e.target.name, content: e.target.value, id });
  };

  render() {
    const { details } = this.props;
    return (
      <DetailsContainer>
        <DetailsHeader>
          <Ui.PanelTitle small>Details</Ui.PanelTitle>
        </DetailsHeader>
        <DetailsList>
          {Object.entries(details)
            .filter(Details.filterDetails)
            .map(([key, value]) => (
              <DetailsListItem key={key}>
                <DetailsKey>{key}:</DetailsKey>
                <Ui.PanelInput
                  flat
                  name={key}
                  value={value}
                  onChange={this.onChange}
                  placeholder="click to edit"
                />
              </DetailsListItem>
            ))}
        </DetailsList>
      </DetailsContainer>
    );
  }
}

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`;

const DetailsList = styled.ul`
  list-style: none;
`;

const DetailsListItem = styled.li`
  display: flex;
  align-items: baseline;
`;

const DetailsKey = styled.span`
  font-size: 10px;
  font-weight: bold;
  margin: 0 10px 0 0;
`;

export default Details;
