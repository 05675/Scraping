import * as React from 'react';
import { Spinner } from '@src/components/spinner';

interface LoadingProps {
  isLoading: boolean;
  circleSize?: number;
  color?: string;
  borderWidth?: number;
  rotateSpeed?: string;
}

export const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  if (!props.isLoading) {
    return null;
  }

  return (
    <>
      <div className='backdrop' />
      <div className='loader-pos'>
        <Spinner
          circleSize={props.circleSize}
          color={props.color}
          borderWidth={props.borderWidth}
          rotateSpeed={props.rotateSpeed}
        />
      </div>
      <style jsx>
        {`
          .backdrop {
            position: absolute;
            display: inline;
            background: #ffffff;
            opacity: 0.6;
            width: 100%;
            height: 100%;
            top: 0px;
            z-index: 99999998;
          }
          .loader-pos {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            -webkit-transform: translateY(-50%) translateX(-50%);
            z-index: 99999999;
          }
        `}
      </style>
    </>
  );
};

export default Loading;
