import styled from 'styled-components';
import React from 'react';


const Input = styled.input`
  width: 100%;
  color: rgba(255,255,255,0.8);
  font-size: 11px;
  line-height: ${p => p.flat ? 1 : 1.8};
  font-weight: 300;
  background-color: transparent;
  border: 0;
  outline: 0;
`;

const InputContainer = styled.div`
  margin: ${p => p.flat ? 0 : '0 0 10px'};
  flex: 1;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background-color: rgba(255,255,255,0.8);
    transition: width 150ms ease-in;
  }

  &.focused {
    &::after {
      width: 100%;
    }
  }
`;

class PanelInput extends React.PureComponent {
  state = { focused: false };
  render() {
    return (
      <InputContainer flat={this.props.flat} className={this.state.focused ? 'focused' : ''}>
        <Input
          {...this.props}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
        />
      </InputContainer>
    );
  }
}

export default PanelInput;