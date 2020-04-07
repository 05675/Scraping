import React from 'react';
import { PasswordInput } from '@src/components/passwordInput';
import { shallow } from 'enzyme';
import { StyledInput } from '@src/styles';

describe('サインイン画面', () => {
  test('PasswordInputコンポーネントのtype属性がpasswordか確認', () => {
    const app = shallow(<PasswordInput />);
    const attribute = app.find(StyledInput);
    const type = attribute.prop('type');
    expect(type).toBe('password');
  });
});
