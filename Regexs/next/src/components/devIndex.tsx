import * as React from 'react';
import Link from 'next/link';

// テスト用 sample
const pathnameToPageName: { [pathname: string]: string } = {
  // Developers
  '/Developers/createTask': 'タスク作成',
  '/Developers/demoTask': 'タスク一括登録',
  '/Developers/demoControl': 'デモ用管理機能',
  '/Developers/taskManage': '年末調整',

  // 従業員page
  '/signin': 'サインイン',
  '/tasks': 'タスク一覧',
  '/nencho/test_id_0xd1': '2020年分年末調整',
  '/nencho/test_id_0xd1/insurances': '保険料控除',
  '/nencho/test_id_0xd1/lifeInsuranceInputs/new': '生命保険入力',
};

const DevIndex: React.FC = () => {
  return (
    <div>
      <ul className='list-style'>
        <p style={{ textAlign: 'center', color: '#525252' }}>Sample Page（開発用）</p>
        {Object.keys(pathnameToPageName).map(pathname => (
          <div key={pathname}>
            <li className='listItem-style'>
              <Link href={pathname}>
                <a className='Anchor-style'>{pathnameToPageName[pathname]}</a>
              </Link>
            </li>
          </div>
        ))}
      </ul>
      <style jsx>
        {`
          .list-style {
            margin: 0;
            padding: 0;
            position: relative;
          }
          .listItem-style {
            color: black;
            border-left: solid 8px orange;
            background: whitesmoke;
            margin-bottom: 5px;
            line-height: 1.5;
            border-radius: 0 15px 15px 0;
            padding: 0.5em;
            list-style-type: none !important;
          }
          .anchor-style {
            display: block;
            padding: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default DevIndex;
