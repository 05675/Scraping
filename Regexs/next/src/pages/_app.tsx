import * as React from 'react';
import { NextPage } from 'next';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import 'react-datepicker/dist/react-datepicker.css';
import '@src/styles/styles.css';

const App: NextPage<AppPropsType> = ({ Component, pageProps }) => {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
