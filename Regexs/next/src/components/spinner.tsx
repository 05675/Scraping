import * as React from 'react';
import { StyledSpinner } from '../styles/spinner';

type SpinnerProps = {
  circleSize?: number;
  borderWidth?: number;
  rotateSpeed?: string;
  color?: string;
};

export const Spinner: React.FC<SpinnerProps> = props => {
  const circleSize = props.circleSize ?? 96;
  const borderWidth = props.borderWidth ?? 10;

  return (
    <>
      <StyledSpinner
        circleSize={circleSize}
        color={props.color}
        borderWidth={borderWidth}
        rotateSpeed={props.rotateSpeed}>
        <circle
          className='path'
          cx={circleSize / 2} /* スピナーの中心座標 */
          cy={circleSize / 2}
          r={circleSize / 2 - borderWidth / 2} /* サークルの半径 */
          fill='none'
        />
      </StyledSpinner>
    </>
  );
};
