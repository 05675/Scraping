import { NextApiRequest, NextApiResponse } from 'next';
import { createMany } from '@src/model/employees';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';
import { Employees } from '@src/model/entity';

const handler: Handler = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const employees: Employees[] = req.body;
    try {
      await createMany(employees);
      return res.status(200).json({ message: 'employees created' });
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },
};

export default responder(handler);
