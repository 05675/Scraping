import React from 'react';
import { StyledInput } from '@src/styles';
import { EyeSVG, EyeOffSVG } from '@assets/images';

export const PasswordInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = props => {
  const [isMasked, setIsMasked] = React.useState(true);

  const inputType = isMasked ? 'password' : 'text';

  const handleClick = () => setIsMasked(!isMasked);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <StyledInput {...props} type={inputType} />
        <span className='eye-button' onClick={handleClick} role='button'>
          {isMasked ? <EyeOffSVG /> : <EyeSVG />}
        </span>
      </div>

      {/* style */}
      <style jsx>{`
        .eye-button {
          position: absolute;
          top: 13px;
          right: 17px;
        }

        .eye-button:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};
