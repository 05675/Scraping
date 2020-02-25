import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import Dev from './Developers';

const page: NextPage = () => {
  return <Dev />;
};

page.getInitialProps = (ctx: NextPageContext) => {
  if (process.env.NODE_ENV !== 'development') {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/tasks' });
      ctx.res.end();
    }
  }

  return {};
};

export default page;