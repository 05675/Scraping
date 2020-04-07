import styled, { css } from 'styled-components';
import { NenchoInsuranceStatus } from '@src/model/entity/nencho/nencho';

interface StyledButtonProps {
  important?: boolean;
  primary?: boolean;
  warning?: boolean;
  smallSize?: boolean;
  fontSize?: string;
  width?: string;
  height?: string;
  labelOffsetLeft?: string;
  noShadow?: boolean;
}

export const StyledButton = styled.button`
  display: inline-block;
  box-sizing:border-box;
  font-weight: bold;
  font-style: normal;
  line-height: 100%;
  text-align: center;
  background: #dedede;
  color: #b3b3b3;
  outline: none;
  border: none;
  border-radius: 24px;
  letter-spacing: 0.06em;
  padding-right:24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  cursor: hand;

  ${(props: StyledButtonProps) =>
    css`
      padding-left: ${props.labelOffsetLeft ?? '24px'};
      font-size: ${props.fontSize ?? '16px'};
      width: ${props.width ?? '100%'};
      height: ${props.height ?? '48px'};
    `}
  ${(props: StyledButtonProps) =>
    props.noShadow &&
    css`
      box-shadow: none;
    `}
  ${(props: StyledButtonProps) =>
    props.smallSize &&
    css`
      padding-left: 12px;
      padding-right: 12px;
      font-size: ${props.fontSize ?? '12px'};
      width: ${props.width ?? '100%'};
      height: ${props.height ?? '24px'};
      box-shadow: none;
    `}
  ${(props: StyledButtonProps) =>
    props.important &&
    css`
      background: #3aa0fa;
      color: #ffffff;
      :focus {
        background: #5cb1fc;
        color: #ffffff;
      }
    `}
  ${(props: StyledButtonProps) =>
    props.primary &&
    css`
      border: 2px solid #525252;
      box-sizing: border-box;
      background: #ffffff;
      color: #525252;
      :focus {
        background: #525252;
        color: #ffffff;
      }
    `}
  ${(props: StyledButtonProps) =>
    props.warning &&
    css`
      border: 2px solid #fa3939;
      box-sizing: border-box;
      background: none;
      color: #fa3939;
      :focus {
        background: #fa3939;
        color: #ffffff;
      }
    `}
  :disabled {
    outline: none;
    border: none;
    background: #dedede;
    color: #b3b3b3;
  }
`;

interface NenchoButtonProps extends StyledButtonProps {
  nenchoStatus?: number;
}

export const NenchoButton = styled(StyledButton)<NenchoButtonProps>`
  ${(props: NenchoButtonProps) =>
    props.nenchoStatus === NenchoInsuranceStatus.NOT_SUBMITTED &&
    css`
      animation: changeColor 1.47s 0.46s;
      @keyframes changeColor {
        0% {
          background-color: #3aa0fa;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          animation-timing-function: ease-out;
        }
        20% {
          background-color: #5cb1fc;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        }
        88% {
          background-color: #5cb1fc;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          animation-timing-function: ease-out;
        }
        100% {
          background-color: #3aa0fa;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }
      }
    `}
`;
