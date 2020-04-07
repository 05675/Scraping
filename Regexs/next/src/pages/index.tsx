import * as React from 'react';
import { NextPage } from 'next';
import DevIndex from '@src/components/devIndex';
import { PageInfo } from '@src/interfaces/pageInfo';

const page: NextPage = () => {
  return <DevIndex />;
};

page.getInitialProps = ctx => {
  if (process.env.NODE_ENV !== 'development') {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/tasks' });
      ctx.res.end();
    }
  }

  const pageInfo: PageInfo = { currentPageName: 'インデックス' };

  return { pageInfo };
};

export default page;
