import { NextApiRequest, NextApiResponse } from 'next';
import { readAll, create, read, destroyAll } from '@src/model/employees';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';

const handler: Handler = {
  // TODO: page機能を追加したい。
  get: async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
      const employeeList = await readAll();
      if (employeeList) {
        return res.status(200).json({ employeeList });
      }
      return res.status(404).json({ message: '従業員情報が見つかりませんでした！' });
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },

  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const employee = req.body;
    try {
      const isExist = await read(employee.empId);
      if (isExist) return res.status(403).json({ message: 'id already exists' });
      const result = await create(employee);
      if (result.raw.affectedRows === 0) {
        return res.status(400).json({ message: '反映個所無し' });
      }
      return res.status(200).json({ message: 'employee created' });
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },

  delete: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await destroyAll();
      return res.status(200).json({ message: '全ての従業員を削除' });
    } catch (err) {
      return res.status(500).json({ message: `エラーが発生しました${err}` });
    }
  },
};

export default responder(handler);
