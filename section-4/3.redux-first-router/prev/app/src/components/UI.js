import React from 'react';
import styled from 'styled-components';

export { default as Normalizr } from 'components/Normalizr';
export { default as PanelInput } from 'components/PanelInput';

const SIZES = {
  small: '10px',
  medium: '16px',
  large: '18px',
  default: 'calc(10px + 2vmin)'
};

const FONTS = {
  mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace'
};

const COLORS = {
  border: 'rgba(255,255,255,0.2)',
  background: '#282c34',
  text: 'rgba(255,255,255,0.8)'
};

export const Main = styled.main`
  padding: 60px 40px;
  background-color: ${COLORS.background};
  min-height: calc(100vh - 120px);
  font-size: ${SIZES.default};
  font-family: ${FONTS.mono};
  color: white;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  margin: 22px 0 0;
  width: 100%;
  height: 500px;
  border: 1px solid ${COLORS.border};
  border-radius: 4px;
  overflow: auto;
`;

export const PanelTitle = styled.p`
  font-size: ${p => p.small ? SIZES.small : SIZES.medium};
  color: ${COLORS.text};
  text-transform: capitalize;
`;

export const PanelBox = styled.div`
  padding: 8px;
  width: 100%;
  border: 0;
  border-bottom: solid 1px ${COLORS.border};

  &:hover {
    cursor: ${p => (p.disabled ? 'default' : 'pointer')};
    border: ${p => (p.disabled ? '' : 'solid 2px ' + COLORS.border)};
  }
`;

export const Button = styled.button`
  display: flex;
  padding: 5px 2px;
  color: ${COLORS.text};
  background-color: transparent;
  border: 1px solid ${COLORS.border};
  font-size: ${SIZES.small};
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 5px 10px 0;

  &:hover {
    color: #282c34;
    border-color: #282c34;
    background-color: ${COLORS.text};
  }

  &:last-child {
    margin: 0;
  }
`;

const AddButtonContainer = styled.button`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0;
  font-size: ${SIZES.large};
  border-radius: 100%;
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: ${COLORS.text};
  background-color: transparent;
  border: 1px solid ${COLORS.border};

  span {
    display: block;
    margin: -2px 0 0;
  }

  &:hover {
    color: #282c34;
    border-color: #282c34;
    background-color: ${COLORS.text};
  }
`;

export const AddButton = p => (
  <AddButtonContainer>
    <span>+</span>
  </AddButtonContainer>
);
