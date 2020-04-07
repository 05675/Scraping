import React from 'react';
import { StyledButton } from '@src/styles';
import { StyledPlusSVG } from '@src/styles/svg';

type AddInsurancesButtonProps = {
  label?: string;
  important?: boolean;
  primary?: boolean;
  warning?: boolean;
  smallSize?: boolean;
  fontSize?: string;
  width?: string;
  height?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: any) => void;
};

export const AddInsurancesButton: React.FC<AddInsurancesButtonProps> = props => {
  return (
    <>
      <div
        style={{
          position: 'relative',
          width: `${props.width ?? '100%'}`,
          height: `${props.height ?? '48px'}`,
        }}>
        <span className='plus-icon'>
          <StyledPlusSVG color='#525252' />
        </span>
        <StyledButton
          important={props.important}
          primary={props.primary}
          warning={props.warning}
          smallSize={props.smallSize}
          fontSize={props.fontSize}
          width={props.width}
          height={props.height}
          onClick={props.onClick}
          labelOffsetLeft='48px'
          noShadow>
          {props.children}
        </StyledButton>
      </div>

      <style jsx>
        {`
          .plus-icon {
            position: absolute;
            width: 24px;
            height: 24px;
            top: calc(50% - 12px);
            left: 24px;
          }
        `}
      </style>
    </>
  );
};

export default AddInsurancesButton;
