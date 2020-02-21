import { IncomingMessage } from 'http';

/**
 * This is not production ready, (except with providers that ensure a secure host, like Now)
 *  For production consider the usage of environment variables and NODE_ENV
 *
 * @param {IncomingMessage} req リクエスト
 * @returns {string} ホスト名
 */
function getHost(req?: IncomingMessage) {
  if (!req) return '';

  const { host } = req.headers;

  if (host && host.startsWith('localhost')) {
    return `http://${host}`;
  }
  return `https://${host}`;
}

export default getHost;
