import React from 'react';
import renderer from 'react-test-renderer';
import { BurgerComponent } from '@src/components/burger';

describe('burger', () => {
  test('snapshot', () => {
    const snapshot = renderer.create(<BurgerComponent open={false} setOpen={() => {}} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
