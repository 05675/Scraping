import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MenuComponent from '@src/components/menu';
import BurgerComponent from '@src/components/burger';
import useOnClickOutside from '@src/util/hooks';
import { StyledLogoSvg } from '@src/styles/svg';

type Props = {
  title?: string;
  isHeader?: boolean;
  isFooter?: boolean;
};

/**
 * 共通ヘッダーコンポーネント
 *
 * @returns {*} Reactコンポーネント
 */
function getHeader() {
  // TODO:後で調査する
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  // TODO:後で調査する
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const node = useRef<HTMLDivElement>(null);
  // TODO:後で調査する
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useOnClickOutside(node, () => setOpen(false));
  return (
    <header>
      <section className='payroll'>
        <div className='payroll-body'>
          <div className='container'>
            <div className='flex-container'>
              <div className='flex-item-left'>
                <Link href='/'>
                  <a href='/' className='arrow-left'>
                    タスク一覧
                  </a>
                </Link>
              </div>
              <div className='flex-item-center'>
                <StyledLogoSvg width='150' height='30' />
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
          .arrow-left {
            position: relative;
            padding-left: 18px;
            font-family: Noto Sans JP;
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
            top: 50%;
            left: 0;
            margin-top: -3px;
          }
          .arrow-left ::after {
            position: absolute;
            content: '';
            width: 10px;
            height: 2px;
            background-color: #797979;
            top: 50%;
            left: 1px;
          }
          .flex-container {
            height: 52px;
            width: 100%
            position: fixed;
            display: flex;
            // top: 0;
            width: 100%;
            padding: 10px 0 5px 0;
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
            text-align: center;
          }
          .flex-item-right {
            width: 30%;
            text-align: right;
          }
        `}
      </style>
    </header>
  );
}

/**
 * 共通フッターコンポーネント
 *
 * @returns {*} Reactコンポーネント
 */
function getFooter() {
  return (
    <footer className='footer'>
      <div className='content has-text-centered'>
        <p />
      </div>
    </footer>
  );
}

/**
 * 共通レイアウトコンポーネント
 *
 * @param {*} {
 *   children,
 *   title = 'Next Gen Beta',
 *   isHeader = true,
 *   isFooter = true,
 * }
 * @returns {*} Reactコンポーネント
 */
const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'Next Gen Beta',
  isHeader = true,
  isFooter = true,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <script defer src='https://use.fontawesome.com/releases/v5.3.1/js/all.js' />
      <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
    </Head>
    {isHeader && getHeader()}
    <section className='section'>
      <div className='container'>{children}</div>
    </section>
    {isFooter && getFooter()}
  </div>
);

export default Layout;
