import * as React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import 'react-datepicker/dist/react-datepicker.css';
import '@src/styles/styles.css';
import { Header } from '@src/components/header';
import { pathnameToPageInfo } from '@src/util/pathnameToPageInfo';

const App: NextPage<AppPropsType> = ({ Component, pageProps, router }) => {
  const { pathname } = router;
  const { currentPageName, previousPageName, previousPathname } =
    pathnameToPageInfo[pathname] || {};
  const pathnameIsNotLogin = pathname !== '/login';

  return (
    <>
      <Head>
        <title>{currentPageName}</title>
        <meta charSet='utf-8' />
        <meta key='viewport' name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      {pathnameIsNotLogin && (
        <Header previousPageName={previousPageName} previousPathname={previousPathname} />
      )}

      <Component {...pageProps} />
    </>
  );
};

export default App;
