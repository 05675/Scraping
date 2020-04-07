import DemoControl from '@src/pages/Developers/demoControl';
import { mount } from 'enzyme';
import React from 'react';

// TODO 画面構成がある程度固まったらsnapshotテストも実装する

describe('DB初期化機能', () => {
  test('正常系_実行前表示', () => {
    const wrapper = mount(<DemoControl />);
    expect(wrapper.find('#allDeleteResult').text()).toBe('未実行');
  });

  test('正常系_実行後表示', () => {
    jest.mock('axios');
    const wrapper = mount(<DemoControl />);
    wrapper
      .find('#deleteAllTaskButton')
      .at(0)
      .simulate('click');
    // statusの表示が変わったかどうか
    expect(wrapper.find('#allDeleteResult').text()).toBe('実行中');
  });
});

describe('全従業員ログイン時間リセット機能', () => {
  test('正常系_実行前表示', () => {
    const wrapper = mount(<DemoControl />);
    expect(wrapper.find('#resetAllEmployeeLoginTimeResult').text()).toBe('未実行');
  });
});

describe('ログイン済み従業員の数を取得', () => {
  test('正常系_実行前表示', () => {
    const wrapper = mount(<DemoControl />);
    expect(wrapper.find('#loginedEmployeeNumResult').text()).toBe('未実行');
  });
});

describe('全従業員登録処理', () => {
  test('正常系_実行前表示', () => {
    const wrapper = mount(<DemoControl />);
    expect(wrapper.find('#resultOfRegistAllEmployee').text()).toBe('未実行');
  });
});

describe('発行済みのタスク数の確認処理', () => {
  test('正常系_実行前表示', () => {
    const wrapper = mount(<DemoControl />);
    expect(wrapper.find('#publishedTaskNumResult').text()).toBe('未実行');
  });
});

describe('従業員を選択してタスクを発行する処理', () => {
  test('正常系_実行前表示', () => {
    const wrapper = mount(<DemoControl />);
    expect(wrapper.find('#publishTaskResult').text()).toBe('未実行');
  });
});
