import React from 'react';
import { StyledLabel, StyledErrorText } from '@src/styles';
import { StyledErrorSVG } from '@src/styles/svg';
import { SelectBoxSingle, SelectBoxSingleProps } from '@src/components/selectBoxSingle';

export interface SelectBoxWithLabelBoxProps extends SelectBoxSingleProps {
  label: string;
  name: string;
  errorMessage?: string;
}

export const SelectBoxWithLabel: React.FC<SelectBoxWithLabelBoxProps> = props => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div className='label'>
        <StyledLabel id='titleLabel'>{props.label}</StyledLabel>
      </div>
      <div style={{ position: 'relative' }}>
        <SelectBoxSingle id='selectBoxSingle' {...props} />
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
          background: white;
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
