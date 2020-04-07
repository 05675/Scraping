import styled, { css } from 'styled-components';

export interface InputProps {
  type?: string;
  maxLength?: number;
  isError?: boolean;
  isPaddingRight?: boolean;
}

export const StyledInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 48px;
  padding: 0;
  color: #525252;
  box-sizing: border-box;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 180%;
  background: rgba(0, 0, 0, 0);
  letter-spacing: 0.06em;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid #ebebeb;

  ${(props: InputProps) =>
    !props.isError &&
    css`
      :focus {
        outline: none;
        border-bottom: 1px solid #3aa0fa;
        box-shadow: 0px 1px 0px #3aa0fa;
      }
    `}

  ${(props: InputProps) =>
    props.isError &&
    css`
      border-bottom: 1px solid #fa3939;
      padding-right: 24px;
      :focus {
        outline: none;
        box-shadow: 0px 1px 0px #fa3939;
      }
    `}
  
  ${(props: InputProps) =>
    props.isPaddingRight &&
    css`
      padding-right: ${props.isError ? '54px' : '14px'};
    `} :disabled {
    color: #b3b3b3;
  }
`;
