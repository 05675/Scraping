import { NextApiRequest, NextApiResponse } from 'next';
import { readAll, create, read } from '../../../model/employees';
import { Handler } from '../../../util/api/interface';
import responder from '../../../util/api/responder';

const handler: Handler = {
  // TODO: page機能を追加したい。
  get: async (_req: NextApiRequest, res: NextApiResponse) => {
    const employeeList = await readAll();

    if (employeeList) {
      return res.status(200).json({ employeeList });
    }
    return res.status(404).json({ message: '従業員情報が見つかりませんでした！' });
  },

  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const employee = req.body;
    const isExist = await read(employee.empId);
    if (isExist) return res.status(403).json({ message: 'id already exists' });

    await create(employee);

    return res.status(200).json({ message: 'employee created' });
  },
};

export default responder(handler);
