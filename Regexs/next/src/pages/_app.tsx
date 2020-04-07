import * as React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import 'react-datepicker/dist/react-datepicker.css';
import '@src/styles/styles.css';
import { Header } from '@src/components/header';
import '@src/styles/react-confirm-alert.css';

const App: NextPage<AppPropsType> = ({ Component, pageProps }) => {
  const {
    pageInfo: { currentPageName, previousPageName, previousPathname } = {
      currentPageName: '',
      previousPageName: '',
      previousPathname: '',
    },
  } = pageProps;

  const pageIsNotSignin = currentPageName !== 'サインイン' && currentPageName !== '年末調整';

  return (
    <>
      <Head>
        <title>{currentPageName}</title>
        <meta charSet='utf-8' />
        <meta key='viewport' name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      {pageIsNotSignin && (
        <Header previousPageName={previousPageName} previousPathname={previousPathname} />
      )}
      <Component {...pageProps} />
    </>
  );
};

export default App;
