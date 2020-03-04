import * as React from "react";
import Head from "next/head";

type Props = {
  title?: string;
  username?: string;
  isHeader?: boolean;
  isFooter?: boolean;
};

/**
 * 共通ヘッダーコンポーネント
 *
 * @param {string} title 表示用タイトル文字列
 * @param {string} username 表示用ユーザー名文字列
 * @returns {*} Reactコンポーネント
 */
function getHeader(title: string, username: string) {
  return (
    <header>
      <section className="payroll">
        <div className="payroll-body">
          <div className="container">
            <h1 className="title">{title}</h1>{" "}
          </div>
        </div>
      </section>
      <style jsx>
        {`
          .payroll-body {
            padding: 1rem 6rem;
          }
          h1,
          h5 {
            color: white;
          }
          .payroll {
            background: #a9a9a9;
          }
          .float-right {
            float: right;
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
    <footer className="footer">
      <div className="content has-text-centered">
        <p></p>
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
 *   username = '',
 *   isHeader = true,
 *   isFooter = true,
 * }
 * @returns {*} Reactコンポーネント
 */
const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Next Gen Beta",
  username = "",
  isHeader = true,
  isFooter = true
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <script
        defer
        src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
      ></script>
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
    </Head>
    {isHeader && getHeader(title, username)}
    <section className="section">
      <div className="container">{children}</div>
    </section>
    {isFooter && getFooter()}
  </div>
);

export default Layout;
