import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { MenuComponent } from '@src/components/menu';
import { BurgerComponent } from '@src/components/burger';
import { useOnClickOutside } from '@src/util/hooks';
import { StyledLogoSvg } from '@src/styles/svg';

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

  return (
    <>
      <header>
        <section className='payroll'>
          <div className='payroll-body'>
            <div className='container'>
              <div className='flex-container'>
                <div className='flex-item-left'>
                  {previousPageName && previousPathname && (
                    <Link href={previousPathname}>
                      <a className='arrow-left'>{previousPageName}</a>
                    </Link>
                  )}
                </div>
                <div className='flex-item-center'>
                  <StyledLogoSvg width='150' height='24' />
                </div>
                <div ref={node} className='flex-item-right'>
                  <BurgerComponent open={open} setOpen={setOpen} />
                  <MenuComponent open={open} setOpen={setOpen} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <style jsx>
          {`
          header {
            position: fixed;
            top:0;
            width:100%;
            z-index:100;
            height: 48px;
          }
          .arrow-left {
            position: relative;
            padding-left: 24px;
            font-family: Noto Sans JP, sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 150%;
            letter-spacing: 0.06em;
            color: #333333;
            text-decoration: none;
          }
          .arrow-left ::before {
            position: absolute;
            content: '';
            width: 6px;
            height: 6px;
            border-top: solid 2px #797979;
            border-left: solid 2px #797979;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            top: 45%;
            left: 10px;
            margin-top: -3px;
          }
          .arrow-left ::after {
            position: absolute;
            content: '';
            width: 10px;
            height: 2px;
            background-color: #797979;
            top: 45%;
            left: 11px;
          }
          .flex-container {
            width: 100%
            position: fixed;
            display: flex;
            width: 100%;
            height: 48px;
            background: #fafafa;
            align-items: center;
          }
          .flex-item-left {
            width: 30%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 2px;
          }
          .flex-item-center {
            width: 40%;
            height: 24px;
            text-align: center;
          }
          .flex-item-right {
            width: 30%;
            text-align: right;
          }
        `}
        </style>
      </header>
      <div style={{ width: '100%', height: '48px' }} />
    </>
  );
};
