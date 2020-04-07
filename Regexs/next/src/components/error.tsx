import React from 'react';

interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = props => {
  return (
    <>
      <p className='error'>{props.message}</p>{' '}
      <style jsx>
        {`
          .error {
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 150%;
            letter-spacing: 0.06em;
            color: #fa3939;
            margin: 16px auto 32px auto;
          }
        `}
      </style>
    </>
  );
};
