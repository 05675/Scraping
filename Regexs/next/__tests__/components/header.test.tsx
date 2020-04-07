import React from 'react';
import renderer from 'react-test-renderer';
import { Header } from '@src/components/header';

describe('header', () => {
  test('snapshot', () => {
    const snapshot = renderer
      .create(<Header previousPageName='testPage' previousPathname='http://dummy.xxx/' />)
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
