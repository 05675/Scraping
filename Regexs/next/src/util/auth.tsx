import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import { NextPageContext, NextPage } from 'next';

export interface CookieProps {
  [key: string]: string;
  token: string;
}

export const login = ({ token }: CookieProps) => {
  cookie.set('token', token, { expires: 1 });
  Router.push('/tasks');
};

export const auth = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res?.writeHead(302, { Location: '/login' });
      ctx.res?.end();
    } else {
      Router.push('/login');
    }
  }

  return token;
};

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now().toString());
  Router.push('/login');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withAuthSync = (WrappedComponent: NextPage<any>) => {
  const Wrapper: NextPage = props => {
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
