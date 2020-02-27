import React from 'react';
import { StyledButton } from '@src/styles';
import { StyledTitle } from '@src/styles/label';

type pageHeaderProps = {
  title: string;
  buttonName?: string;
  buttonFunc?(): void;
};

export const PageHeader: React.FC<pageHeaderProps> = props => {
  return (
    <>
      <header className='page-header'>
        <StyledTitle>
          <div className='page-title'>{props.title}</div>
        </StyledTitle>

        {props.buttonName && props.buttonFunc && (
          <div className='page-button'>
            <StyledButton
              important
              fontSize='14px'
              width='76px'
              height='32px'
              onClick={props.buttonFunc}>
              {props.buttonName}
            </StyledButton>
          </div>
        )}
        <style jsx>
          {`
            .page-header {
              background: #ffffff;
              position: fixed;
              width: 100%;
              height: 48px;
              margin: 0;
              z-index: 1;
            }
            .page-title {
              position: absolute;
              top: 12px;
              margin: 0;
              width: 100%;
            }
            .page-button {
              display: 'inline';
              position: absolute;
              top: 8px;
              right: 8px;
              margin: 0;
            }
          `}
        </style>
      </header>
      <div style={{ width: '100%', height: '48px' }} />
    </>
  );
};

export default PageHeader;
