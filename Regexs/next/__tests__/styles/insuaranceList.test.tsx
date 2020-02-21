import InsuaranceList from '../../../payroll/src/styles/insuaranceList';
import React from 'react';
import renderer from 'react-test-renderer';

describe('InsuaranceList', () => {
  test('InsuaranceList_snapshot', () => {
    const props = { listItems: [{ kind: '保険種別', firm: '保険会社名', key: 0 }] };
    const content = renderer.create(<InsuaranceList {...props} />).toJSON();
    expect(content).toMatchSnapshot();
  });
});
