import React from 'react';
import styled from 'styled-components';

export const MessageBox: React.FC = props => (
  <MessageBoxContainer>
    <MessageBoxText>{props.children}</MessageBoxText>
  </MessageBoxContainer>
);

export const MessageBoxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  box-sizing: border-box;
  background: #ebebeb;
  animation: backgroundFadeIn 0.23s;
  @keyframes backgroundFadeIn {
    0% {
      opacity: 0;
      transform: scale(0, 0);
      height: 0px;
      animation-timing-function: ease-out;
    }
    100% {
      opacity: 1;
      transform: scale(1, 1);
      height: 48px;
    }
  }
`;

export const MessageBoxText = styled.div`
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.06em;
  color: #525252;
  padding: 0px 8px;
  animation: textFadeIn 0.36s;
  @keyframes textFadeIn {
    0% {
      opacity: 0;
    }
    56% {
      opacity: 0;
      animation-timing-function: ease-out;
    }
    100% {
      opacity: 1;
    }
  }
`;
