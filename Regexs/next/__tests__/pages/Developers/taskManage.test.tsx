import TaskManage from '@src/pages/Developers/taskManage';
import React from 'react';
import renderer from 'react-test-renderer';

describe('年末調整', () => {
  test('snapshot', () => {
    const snapshot = renderer.create(<TaskManage />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
