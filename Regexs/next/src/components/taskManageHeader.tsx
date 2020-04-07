import React from 'react';
import { StyledLogoWhiteSVG } from '@src/styles/svg';
import Headroom from 'react-headroom';

/**
 * demo用ヘッダーコンポーネント
 *
 * @returns {*} Reactコンポーネント
 */
export const TaskManageHeader: React.FC = () => {
  return (
    <>
      {/* <header> */}
      <Headroom disableInlineStyles>
        <div className='container-top'>
          <span>
            <StyledLogoWhiteSVG color='white' width='65.75' height='20' />
          </span>
        </div>
        <div className='container-bottom'>
          <span>年末調整</span>
        </div>
        <style jsx>
          {`
          .container-top {
            width: 100%
            position: fixed;
            display: flex;
            width: 100%;
            height: 48px;
            background: #005BAC;
            align-items: center;
          }
          .container-bottom {
            width: 100%
            position: fixed;
            display: flex;
            width: 100%;
            height: 32px;
            background: #FFFFFF;
            align-items: center;
          }
          span {
            margin-left:32px;
          }
        `}
        </style>
      </Headroom>
    </>
  );
};
