import { NextPageContext } from 'next';
import * as React from 'react';
import { NextPage } from 'next';

export interface testPageProps {
  message: string;
}

const TestPageForGetInitialProps: NextPage<testPageProps> = props => {
  return <div>{props.message}</div>;
};

TestPageForGetInitialProps.getInitialProps = ctx => {
  const pathName = ctx.pathname;
  let propvalue: testPageProps = {
    message: '内部エラー',
  };
  if (!pathName) {
    propvalue.message = '空のクエリ';
    return propvalue;
  }

  if (pathName === 'normal') {
    propvalue.message = '読み込み成功';
  } else if (pathName == 'abnormal') {
    propvalue.message = '読み込み失敗';
  }
  return propvalue;
};

// ここより下がテストコード

describe('テストページ', () => {
  test('getInitialProps_正常系_normal', () => {
    const nextPageContextMock = jest.fn();
    let nextPageContext: NextPageContext = new nextPageContextMock();
    nextPageContext.pathname = 'normal';
    const props = TestPageForGetInitialProps.getInitialProps?.(nextPageContext);
    expect(props).toMatchObject({ message: '読み込み成功' });
  });

  test('getInitialProps_異常系_abnormal', () => {
    const nextPageContextMock = jest.fn();
    let nextPageContext: NextPageContext = new nextPageContextMock();
    nextPageContext.pathname = 'abnormal';
    const props = TestPageForGetInitialProps.getInitialProps?.(nextPageContext);
    expect(props).toMatchObject({ message: '読み込み失敗' });
  });

  test('getInitialProps_異常系_内部エラー', () => {
    const nextPageContextMock = jest.fn();
    let nextPageContext: NextPageContext = new nextPageContextMock();
    nextPageContext.pathname = 'default';
    const props = TestPageForGetInitialProps.getInitialProps?.(nextPageContext);
    expect(props).toMatchObject({ message: '内部エラー' });
  });

  test('getInitialProps_異常系_クエリ無し', () => {
    const nextPageContextMock = jest.fn();
    let nextPageContext: NextPageContext = new nextPageContextMock();
    const props = TestPageForGetInitialProps.getInitialProps?.(nextPageContext);
    expect(props).toMatchObject({ message: '空のクエリ' });
  });
});
