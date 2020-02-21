import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { StyledLogoSvg } from '../styles/svg';

type Props = {
  title?: string;
  isHeader?: boolean;
  isFooter?: boolean;
};

/**
 * 共通ヘッダーコンポーネント
 *
 * @param {string} title 表示用タイトル文字列
 * @returns {*} Reactコンポーネント
 */
function getHeader(title: string) {
  return (
    <header>
      <section className='payroll'>
        <div className='payroll-body'>
          <div className='container'>
            <div className='flex-container'>
              <div className='flex-item-left'>
                <Link href='/'>
                  <span className='arrow-left'>タスク一覧</span>
                </Link>
              </div>
              <div className='flex-item-center'>
                <StyledLogoSvg width='150' height='30' />
              </div>
              <div className='flex-item-right'>
                {title === '生命保険' ? <button>保存</button> : null}
              </div>
            </div>
            <div className='container-title'>
              <p className='title'>{title}</p>{' '}
            </div>
          </div>
        </div>
      </section>
      <style jsx>
        {`
          .container-title {
            text-align: center;
          }
          .title {
            font-family: Noto Sans JP;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 150%;
            text-align: center;
            color: #333333;
          }
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
            display: flex;
            width: 100%;
            margin-top: 10px;
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
    {isHeader && getHeader(title)}
    <section className='section'>
      <div className='container'>{children}</div>
    </section>
    {isFooter && getFooter()}
  </div>
);

export default Layout;
