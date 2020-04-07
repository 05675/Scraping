import React from 'react';
import renderer from 'react-test-renderer';
import { Error } from '@src/components/error';

describe('error', () => {
  test('snapshot', () => {
    const snapshot = renderer.create(<Error message='test' />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
