import CreateTask from '../../src/pages/createTask';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

const optionGroup = [{ label: '組織', value: '組織1' }];
const optionUser = [{ label: '氏名', value: '氏名1' }];

const DataMock = jest.fn();
let dataFromDb = new DataMock();
dataFromDb.optionGroup = optionGroup;
dataFromDb.optionUser = optionUser;

describe('タスク登録画面', () => {
  test('snapshot', () => {
    const snapshot = renderer.create(<CreateTask />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  test('ユーザー名表示_正常', () => {
    const wrapper = mount(<CreateTask />);
    expect(wrapper.find('.username').text()).toBe('さん');
  });

  test('組織グループの情報の更新_正常', () => {
    const wrapper = mount(<CreateTask />);
    wrapper.setProps(dataFromDb);
    const groupWrapper = wrapper.find('SingleSelectComponent');
    expect(groupWrapper.prop('options')).toBe(optionGroup);
  });
});
