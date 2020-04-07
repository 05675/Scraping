import React from 'react';
import renderer from 'react-test-renderer';
import { PasswordInput } from '@src/components/passwordInput';

describe('passwordInput', () => {
  test('snapshot', () => {
    const snapshot = renderer.create(<PasswordInput />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
