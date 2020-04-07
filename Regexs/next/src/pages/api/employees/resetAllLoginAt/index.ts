import { NextApiRequest, NextApiResponse } from 'next';
import { resetAllLoginAt } from '@src/model/employees';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';

const handler: Handler = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    await resetAllLoginAt();
    return res.status(200).json({ message: `reset each employee's login at` });
  },
};

export default responder(handler);
