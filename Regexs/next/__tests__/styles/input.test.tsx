import { StyledInput } from '@src/styles/input';
import React from 'react';
import renderer from 'react-test-renderer';

describe('StyledInput', () => {
  test('snapshot isError isPaddingRight', () => {
    const content = renderer
      .create(<StyledInput isError={false} isPaddingRight={false} />)
      .toJSON();
    expect(content).toMatchSnapshot();
  });
  test('snapshot isError isNotPaddingRight', () => {
    const content = renderer.create(<StyledInput isError={false} isPaddingRight />).toJSON();
    expect(content).toMatchSnapshot();
  });
  test('snapshot isNotError isPaddingRight', () => {
    const content = renderer.create(<StyledInput isError isPaddingRight={false} />).toJSON();
    expect(content).toMatchSnapshot();
  });
  test('snapshot isNotError isNotPaddingRight', () => {
    const content = renderer.create(<StyledInput isError isPaddingRight />).toJSON();
    expect(content).toMatchSnapshot();
  });
});
