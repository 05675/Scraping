import renderer from 'react-test-renderer';
import * as React from 'react';
import MyPage from '@src/pages/tasks';

jest.mock('next/router', () => ({ push: jest.fn() }));

describe('マイページ', () => {
  test('snapshot_タスク無し', () => {
    const noTaskProps = jest.fn();
    const snapshot = renderer.create(<MyPage children={noTaskProps} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});