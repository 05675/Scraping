import { NextApiRequest, NextApiResponse } from 'next';
import contractableResponder from '@src/util/api/contractableResponder';
import { Handler } from '@src/util/api/interface';
import { read as readTasks, update, destroy } from '@src/model/tasks';
import { hasEmplpyees } from '..';

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const taskId = req.query.taskId as string;
    const task = await readTasks(taskId);

    return res.status(200).json({ task });
  },

  put: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const taskId = req.query.taskId as string;
    await update(taskId, req.body);

    return res
      .status(200)
      .json({ message: `task of taskId ${taskId} of employee id ${empId} updated` });
  },

  delete: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const taskId = req.query.taskId as string;
    await destroy(taskId);

    return res.status(200).json({ message: `task of taskId ${taskId} of ${empId} deleted` });
  },
};

// hasEmplpyees を用いて指定IDの Employees が有ることを動作条件とします。
export default contractableResponder(handler, hasEmplpyees);
