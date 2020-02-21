import { login, logout } from '../../src/util/auth';
import cookie from 'js-cookie';
import { NextPageContext } from 'next';

jest.mock('next/router', () => ({ push: jest.fn() }));
const nextPageContextMock = jest.fn();
const nextPageContext: NextPageContext = new nextPageContextMock();

describe('auth', () => {
  test('login_正常系_cookieに任意の値が代入される', () => {
    logout();
    login({ token: 'token' });
    expect(cookie.get('token')).toBe('token');
  });
  test('logout_正常系_cookieに値が存在していない', () => {
    login({ token: 'token' });
    logout();
    expect(cookie.get('token')).toBe(undefined);
  });
});
