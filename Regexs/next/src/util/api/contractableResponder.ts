import { NextApiRequest, NextApiResponse } from 'next';
import { Handler } from './interface';

export default <TContract>(
  handler: Handler,
  contractor: (req: NextApiRequest, res: NextApiResponse, method: string) => Promise<TContract>
) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toLocaleLowerCase();
    if (!method) return res.status(400).json({ message: 'http method undefined' });

    const contracted = await contractor(req, res, method);
    if (!contracted) return contracted;

    return await handler[method](req, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
