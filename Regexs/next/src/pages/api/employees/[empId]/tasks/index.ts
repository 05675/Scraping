import { NextApiRequest, NextApiResponse } from 'next';
import { create, readTasksByEmpId } from '@src/model/tasks';
import { Handler } from '@src/util/api/interface';
import contractableResponder from '@src/util/api/contractableResponder';
import { hasEmplpyees } from '..';

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const taskList = await readTasksByEmpId(empId);
    return res.status(200).json({ taskList });
  },

  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    await create({ ...req.body, empId });
    return res.status(200).json({ message: `tasks of employee id ${empId} created` });
  },
};

// hasEmplpyees を用いて指定IDの Employees が有ることを動作条件とします。
export default contractableResponder(handler, hasEmplpyees);
