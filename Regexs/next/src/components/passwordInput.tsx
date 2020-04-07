import React from 'react';
import { StyledEyeSVG, StyledEyeOffSVG } from '@src/styles/svg';
import { StyledInput } from '@src/styles';

export const PasswordInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [isMasked, setIsMasked] = React.useState(true);

  const inputType = isMasked ? 'password' : 'text';

  const handleClick = () => setIsMasked(!isMasked);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <StyledInput {...props} type={inputType} />
        <div className='eye-button-container' onClick={handleClick} role='button'>
          {isMasked ? <StyledEyeSVG /> : <StyledEyeOffSVG />}
        </div>
      </div>

      {/* style */}
      <style jsx>{`
        .eye-button-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0px;
          right: 0px;
          width: 48px;
          height: 48px;
        }

        .eye-button:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};
