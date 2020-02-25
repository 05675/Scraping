import { NextPageContext } from 'next';

/**
 * This is not production ready, (except with providers that ensure a secure host, like Now)
 * For production consider the usage of environment variables and NODE_ENV
 *
 * @param {NextPageContext} ctx Nextページコンテキスト
 * @param {string} path APIの相対パス
 * @returns {string} APIの絶対パス（Nextページコンテキスト、またはNextページコンテキストのリクエストが存在しない場合は空文字）
 */
export function apiUrl(ctx: NextPageContext, path: string): string {
  if (!ctx) return '';
  if (!ctx.req) return '';

  const { host } = ctx.req.headers;

  if (host?.startsWith('localhost')) {
    return `http://${host}${path}`;
  }
  return `https://${host}${path}`;
}

export default apiUrl;
