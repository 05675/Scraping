import React from 'react';
import renderer from 'react-test-renderer';
import CreateTask from '@src/pages/Developers/createTask';

const optionGroup = [{ label: '組織', value: '組織1' }];
const optionUser = [{ label: '氏名', value: '氏名1' }];

const DataMock = jest.fn();
const dataFromDb = new DataMock();
dataFromDb.optionGroup = optionGroup;
dataFromDb.optionUser = optionUser;

describe('タスク登録画面', () => {
  test('snapshot', () => {
    const snapshot = renderer.create(<CreateTask />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
