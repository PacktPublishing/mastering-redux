import styled from 'styled-components';
import React from 'react';
import { COLORS, FONTS, SIZES } from 'components/theme';


const Input = styled.input`
  width: 100%;
  color: ${COLORS.text};
  font-size: 11px;
  line-height: ${p => p.flat ? 1 : 1.8};
  font-weight: 300;
  background-color: transparent;
  border: 0;
  outline: 0;
`;

const InputContainer = styled.div`
  margin: ${p => p.flat ? 0 : '0 0 10px'};

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background-color: ${COLORS.text};
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
      <InputContainer
        flat={this.props.flat}
        active={this.props.active}
        className={this.state.focused ? 'focused' : ''}
      >
        <Input
          {...this.props}
          autoFocus
          autoComplete="off"
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
        />
      </InputContainer>
    );
  }
}

export default PanelInput;
