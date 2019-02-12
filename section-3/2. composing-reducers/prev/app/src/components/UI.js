import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export { default as Normalizr } from 'components/Normalizr';

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
  font-size: calc(10px + 2vmin);
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
  font-size: 16px;
  color: ${COLORS.text};
`;

export const PanelBox = styled.div`
  padding: 8px;
  width: 100%;
  border: 0;
  border-bottom: solid 1px ${COLORS.border};
  
  &:hover {
    cursor: ${p => p.disabled ? 'default' : 'pointer'};
    border: ${p => (p.disabled ? '' : 'solid 2px ' + COLORS.border)} ;
  }
`;

export const PanelInput = styled.input`
  width: 100%;
  color: ${COLORS.text};
  font-size: 11px;
  line-height: 1.8;
  font-weight: 300;
  text-transform: capitalize;
  background-color: transparent;
  border: 0;
  margin: 0 0 10px;
  
  &:focus {
    border-bottom: 1px solid ${COLORS.text};
  }
`;

export const Button = styled.button`
  padding: 5px 2px;
  color: rgba(255,255,255,0.8);
  background-color: transparent;
  border: 1px solid ${COLORS.border};
  font-size: 10px;
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
