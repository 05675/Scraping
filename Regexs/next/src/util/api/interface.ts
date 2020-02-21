import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandlerFunction = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;

export interface Handler {
  [key: string]: HandlerFunction;
}
