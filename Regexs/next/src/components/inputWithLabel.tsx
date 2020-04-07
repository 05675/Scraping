import React from 'react';
import { StyledLabel, StyledErrorText, StyledInput } from '@src/styles';
import { StyledErrorSVG } from '@src/styles/svg';
import { InputWithLabelProps } from '@src/interfaces/lifeInsuranceInputs';

export const InputWithLabel: React.FC<InputWithLabelProps> = props => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div className='label'>
        <StyledLabel id='titleLabel'>{props.label}</StyledLabel>
      </div>
      <div style={{ position: 'relative' }}>
        <StyledInput id='inputField' {...props} />
        {props.isError && (
          <span className='errorIcon'>
            <StyledErrorSVG id='errorIcon' color='#fa3939' />
          </span>
        )}
      </div>
      {props.isError && (
        <div className='errorText'>
          <StyledErrorText id='errorText'>{props.errorMessage}</StyledErrorText>
        </div>
      )}

      {/* style */}
      <style jsx>{`
        .label {
          height: 18px;
          margin: 0;
        }
        .errorIcon {
          position: absolute;
          width: 24px;
          height: 24px;
          top: 12px;
          right: 0px;
        }
        .errorText {
          width: 100%;
          left: 0px;
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
};
