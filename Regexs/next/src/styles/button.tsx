import styled, { css } from 'styled-components';

interface StyledButtonProps {
  important?: boolean;
  primary?: boolean;
  warning?: boolean;
  fontSize?: string;
  width?: string;
  height?: string;
}

export const StyledButton = styled.button`
  font-weight: bold;
  font-style: normal;
  font-family: Noto Sans JP, sans-serif;
  color: #000000;
  line-height: 16px;
  text-align: center;
  background: #cccccc;
  outline: none;
  border: none;
  border-radius: 24px;
  letter-spacing: 0.06em;

  ${(props: StyledButtonProps) =>
    css`
      fontsize: ${props.fontSize ?? '16px'};
      width: ${props.width ?? '283px'};
      height: ${props.height ?? '48px'};
    `}
  ${(props: StyledButtonProps) =>
    props.important &&
    css`
      background: #0f84ec;
      color: #ffffff;
      :focus {
        background: #188ef5;
      }
      :disabled {
        background: #dedede;
      }
    `}
  ${(props: StyledButtonProps) =>
    props.primary &&
    css`
      border: 2px solid #525252;
      box-sizing: border-box;
      color: #525252;
      background: none;
      :focus {
        color: #ffffff;
        background: #525252;
      }
      :disabled {
        background: #dedede;
      }
    `}
  ${(props: StyledButtonProps) =>
    props.warning &&
    css`
      border: 2px solid #ed463e;
      box-sizing: border-box;
      color: #ed463e;
      background: none;
    `}
`;
