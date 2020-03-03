import { NextApiRequest, NextApiResponse } from 'next';
import { readAll as readAllEmployees } from '@src/model/employees';
import { create } from '@src/model/tasks';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';
import { Employees } from '@src/model/entity';

const handler: Handler = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { task } = req.body;
    const employeeList = await readAllEmployees();
    await Promise.all(
      employeeList.map((employee: Employees) => create({ ...task, empId: employee.empId }))
    );
    return res.status(200).json({ message: 'tasks in bulk created' });
  },
};
export default responder(handler);
