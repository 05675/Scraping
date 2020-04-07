import React from 'react';
import Insuarances from '@src/pages/nencho/[taskId]/insurances';
import renderer from 'react-test-renderer';

describe('保険料控除_入力前（従業員）', () => {
  test('snapshot', () => {
    const content = renderer.create(<Insuarances />).toJSON();
    expect(content).toMatchSnapshot();
  });
});
