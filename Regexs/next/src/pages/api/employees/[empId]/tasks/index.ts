import { NextApiRequest, NextApiResponse } from 'next';
import { read as readEmployees } from '../../../../../model/employees';
import { create, readTasksByEmpId } from '../../../../../model/tasks';
import { Handler } from '../../../../../util/api/interface';
import responder from '../../../../../util/api/responder';

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const isExist = await readEmployees(empId);
    if (!isExist) return res.status(404).json({ message: `employee of ${empId} does not exist` });

    const taskList = await readTasksByEmpId(empId);

    return res.status(200).json({ taskList });
  },

  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const isExist = await readEmployees(empId);
    if (!isExist) return res.status(404).json({ message: `employee of ${empId} does not exist` });

    await create({ ...req.body, empId });

    return res.status(200).json({ message: `tasks of employee id ${empId} created` });
  },
};

export default responder(handler);
