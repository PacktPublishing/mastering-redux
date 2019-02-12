import React from 'react';
import styled from 'styled-components';
import RFRLink from 'redux-first-router-link';
import { COLORS, FONTS, SIZES } from 'components/theme';

export { default as Normalizr } from 'components/Normalizr';
export { default as PanelInput } from 'components/PanelInput';

export const Main = styled.main`
  padding: 60px 40px;
  background-color: ${COLORS.main};
  min-height: calc(100vh - 120px);
  font-size: ${SIZES.default};
  font-family: ${FONTS.mono};
  color: ${COLORS.text};
`;

export const Panel = styled.div`
  margin: 22px 0 0;
  width: 100%;
  border: 1px solid ${COLORS.border};
  border-radius: 4px;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PanelTitle = styled.p`
  font-size: ${p => (p.small ? SIZES.small : SIZES.medium)};
  color: ${COLORS.text};
  text-transform: capitalize;
`;

export const PanelBox = styled.div`
  padding: 8px;
  border: 0;
  border-bottom: solid 1px ${p => (p.active ? COLORS.main : COLORS.border)};
  background-color: ${p => (p.active ? COLORS.accent : 'transparent')};
`;

export const Button = styled.button`
  display: inline-flex;
  padding: 5px 2px;
  color: ${COLORS.text};
  background-color: transparent;
  border: 1px solid
    ${p => (p.active ? 'rgba(255, 255, 255, 0.3)' : COLORS.border)};
  font-size: ${SIZES.small};
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 5px 10px 0;

  &:hover {
    border-color: ${p => (p.active ? COLORS.accent : COLORS.main)};
    background-color: ${p => (p.active ? COLORS.main : COLORS.accent)};
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

export const AddButton = () => (
  <AddButtonContainer>
    <span>+</span>
  </AddButtonContainer>
);

export const Link = styled(RFRLink)`
  display: inline-flex;
  padding: 5px 2px;
  color: ${COLORS.main};
  background-color: ${COLORS.text};
  border: 1px solid ${COLORS.border};
  font-size: 10px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 5px 0 0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    margin: 0;
  }
`;

export const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 8px;
  height: 8px;
  border-top: 8px solid ${COLORS.accent};
  border-right: 8px solid ${COLORS.accent};
  border-bottom: 8px solid ${COLORS.accent};
  border-left: 8px solid ${COLORS.text};
  transform: translateZ(0);
  animation: load 1.1s infinite linear;

  &::after {
    content: '';
    border-radius: 100%;
    width: 8px;
    height: 8px;
  }

  @keyframes load {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
