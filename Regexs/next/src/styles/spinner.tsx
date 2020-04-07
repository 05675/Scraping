import styled from 'styled-components';

interface StyledSpinnerProps {
  circleSize: number;
  borderWidth: number;
  rotateSpeed?: string;
  color?: string;
}

export const StyledSpinner = styled.svg`
  animation: rotate ${(props: StyledSpinnerProps) => props.rotateSpeed ?? '1.5s'} linear infinite; /* 回転の速度と動き */
  width: ${(props: StyledSpinnerProps) => `${props.circleSize}px`}; /* スピナーの描画領域 */
  height: ${(props: StyledSpinnerProps) => `${props.circleSize}px`};

  & .path {
    stroke: ${(props: StyledSpinnerProps) => props.color ?? `#1184ea`};
    stroke-linecap: butt; /* 線の端のスタイル */
    stroke-width: ${(props: StyledSpinnerProps) =>
      `${props.borderWidth}px`}; /* スピナーの線の太さ */
    stroke-opacity: 1;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: ${(props: StyledSpinnerProps) =>
        ((props.circleSize * 3.14) / 10) * 7}; /* スピナーの線分の長さ */
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: ${(props: StyledSpinnerProps) => ((props.circleSize * 3.14) / 10) * 7};
      stroke-dashoffset: 0;
    }
  }
`;
