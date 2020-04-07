import React from 'react';
import renderer from 'react-test-renderer';
import DevIndex from '@src/components/devIndex';

describe('devindex', () => {
  test('snapshot', () => {
    const snapshot = renderer.create(<DevIndex />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
