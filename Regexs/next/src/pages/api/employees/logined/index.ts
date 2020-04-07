import { NextApiRequest, NextApiResponse } from 'next';
import { readAllLoginedEmployees } from '@src/model/employees';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';

const handler: Handler = {
  get: async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
      const employeeList = await readAllLoginedEmployees();
      if (employeeList) {
        return res.status(200).json({ employeeList });
      }
      return res.status(404).json({ message: '従業員情報が見つかりませんでした。' });
    } catch {
      return res.status(500).json({ message: 'DBサーバーエラー' });
    }
  },
};

export default responder(handler);
