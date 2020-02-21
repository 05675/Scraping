import { NextApiRequest, NextApiResponse } from 'next';
import { read as readEmployees } from '../../../../../model/employees';
import { read as readTasks, update, destroy } from '../../../../../model/tasks';
import { Handler } from '../../../../../util/api/interface';
import responder from '../../../../../util/api/responder';

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const isExist = await readEmployees(empId);
    if (!isExist) return res.status(404).json({ message: `employee of ${empId} does not exist` });

    const taskId = req.query.taskId as string;
    const task = await readTasks(taskId);

    return res.status(200).json({ task });
  },

  put: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const isExist = await readEmployees(empId);
    if (!isExist) return res.status(404).json({ message: `employee of ${empId} does not exist` });

    const taskId = req.query.taskId as string;
    await update(taskId, req.body);

    return res
      .status(200)
      .json({ message: `task of taskId ${taskId} of employee id ${empId} updated` });
  },

  delete: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const isExist = await readEmployees(empId);
    if (!isExist) return res.status(404).json({ message: `employee of ${empId} does not exist` });

    const taskId = req.query.taskId as string;
    await destroy(taskId);

    return res.status(200).json({ message: `task of taskId ${taskId} of ${empId} deleted` });
  },
};

export default responder(handler);
