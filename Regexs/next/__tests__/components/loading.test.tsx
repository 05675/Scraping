import React from 'react';
import renderer from 'react-test-renderer';
import { Loading } from '@src/components/loading';

describe('loading', () => {
  test('snapshot', () => {
    const snapshot = renderer.create(<Loading isLoading />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
