import { Handler } from '@src/util/api/interface';
import { NextApiResponse, NextApiRequest } from 'next';
import responder from '@src/util/api/responder';
import { readAll } from '@src/model/nencho/nenchoInsuranceLifeInputs';

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const insuranceInputs = await readAll();
      return res.status(200).json({ insuranceInputs });
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },
};

export default responder(handler);
