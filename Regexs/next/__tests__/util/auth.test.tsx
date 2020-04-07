import { signin, signout } from '@src/util/auth';
import cookie from 'js-cookie';

jest.mock('next/router', () => ({ push: jest.fn() }));

describe('auth', () => {
  test('login_正常系_cookieに任意の値が代入される', () => {
    signout();
    signin({ token: 'token' });
    expect(cookie.get('token')).toBe('token');
  });
  test('logout_正常系_cookieに値が存在していない', () => {
    signin({ token: 'token' });
    signout();
    expect(cookie.get('token')).toBe(undefined);
  });
});
