import Insuarances from '@src/pages/nencho/insurances';
import { NextPageContext } from 'next';
import React from 'react';
import renderer from 'react-test-renderer';

describe('保険料控除_入力前（従業員）', () => {
  test('snapshot', async () => {
    const props = await Insuarances.getInitialProps?.(getNextPageContext());
    if (props) {
      const content = renderer.create(<Insuarances {...props} />).toJSON();
      expect(content).toMatchSnapshot();
      return;
    }
    throw new Error('スナップショットの取得に失敗');
  });

  test('getInitialProps_正常系_返り値', async () => {
    // 期待値
    const expectdValue = { firm: '弥生生命', kind: '生命保険（一般）' };
    const props = await Insuarances.getInitialProps?.(getNextPageContext());
    expect(props?.listItems[0].firm).toBe(expectdValue.firm);
    expect(props?.listItems[0].kind).toBe(expectdValue.kind);
  });
});

const getNextPageContext = () => {
  const nextPageMock = jest.fn();
  const ctx: NextPageContext = new nextPageMock();
  return ctx;
};
