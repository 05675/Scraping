import { NextApiRequest, NextApiResponse } from 'next';
import { Handler } from './interface';

export default (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toLocaleLowerCase();
    if (!method) return res.status(400).json({ message: 'http method undefined' });

    return await handler[method](req, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
