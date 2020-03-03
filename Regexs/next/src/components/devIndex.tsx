import * as React from 'react';
import Link from 'next/link';
import { pathnameToPageInfo } from '@src/util/pathnameToPageInfo';

const DevIndex: React.FC = () => {
  return (
    <div>
      <ul className='list-style'>
        {Object.keys(pathnameToPageInfo).map(pathname => (
          <div key={pathname}>
            <li className='listItem-style'>
              <Link href={pathname}>
                <a className='Anchor-style'>{pathnameToPageInfo[pathname].currentPageName}</a>
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
