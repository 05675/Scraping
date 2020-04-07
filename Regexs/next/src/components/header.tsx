import React, { useState, useRef } from 'react';
import { MenuComponent } from '@src/components/menu';
import { BurgerComponent } from '@src/components/burger';
import { useOnClickOutside } from '@src/util/hooks';
import { StyledLogoWhiteSVG, StyledArrowLeftSVG } from '@src/styles/svg';
import Headroom from 'react-headroom';
import Router from 'next/router';
import { CommonConfirmAlert } from '@src/components/commonConfirmAlert';

interface HeaderProps {
  previousPageName: string;
  previousPathname: string;
}

/**
 * 共通ヘッダーコンポーネント
 *
 * @returns {*} Reactコンポーネント
 */
export const Header: React.FC<HeaderProps> = ({ previousPageName, previousPathname }) => {
  const [open, setOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);
  useOnClickOutside(node, () => setOpen(false));

  const isLifeInpuranceInputPage = previousPageName === '保険料控除';

  const goToPreviousPath = () => Router.push(previousPathname);

  const showGoBackAlertDialog = CommonConfirmAlert({
    message: 'この保険情報を破棄してもよろしいですか？',
    leftButton: {
      label: '破棄',
      labelColor: '#FA3939',
      clickHandler: goToPreviousPath,
    },
    rightButton: { label: '編集を続ける' },
  });

  return (
    <>
      {/* <header> */}
      <Headroom className='common-header' disableInlineStyles onUnpin={() => setOpen(false)}>
        <div className='flex-container'>
          <div className='flex-item-left'>
            {previousPageName && previousPathname && (
              <a
                onClick={isLifeInpuranceInputPage ? showGoBackAlertDialog : goToPreviousPath}
                role='button'>
                <span className='flex-item-left-arrow'>
                  <StyledArrowLeftSVG color='white' />
                </span>
                <span className='flex-item-left-text'>{previousPageName}</span>
              </a>
            )}
          </div>
          <div className='flex-item-center'>
            <StyledLogoWhiteSVG color='white' width='65.75' height='20' />
          </div>
          <div ref={node} className='flex-item-right'>
            <BurgerComponent open={open} setOpen={setOpen} />
            <MenuComponent open={open} setOpen={setOpen} />
          </div>
        </div>
        <style jsx>
          {`
          .flex-container {
            width: 100%
            position: fixed;
            display: flex;
            width: 100%;
            height: 48px;
            background: #005BAC;
            align-items: center;
          }
          .flex-item-left {
            position: relative;
            width:calc(50% - 65px);
            height: 100%;
            text-align: left;
            overflow: hidden;
          }
          .flex-item-left-arrow {
            position: absolute;
            width: 24px;
            height: 24px;
            top: 12px;
            left: 16px;
          }
          .flex-item-left-text {
            position: absolute;
            width: calc(100% - 48px);
            height: 12px;
            top: 18px;
            left: 48px;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 100%;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0;
            padding: 0;
          }
          .flex-item-center {
            width: calc(65px + 32px + 32px);
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .flex-item-right {
            width: calc(50% - 65px);
            height: 100%;
            text-align: right;
          }
        `}
        </style>
      </Headroom>
    </>
  );
};
