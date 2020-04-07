import { NextApiRequest, NextApiResponse } from 'next';
import { readTaskCompleteEmpIdBySignined, createTasks } from '@src/model/tasks';
import { readAll as readAllEmployees, readAllLoginedEmployees } from '@src/model/employees';
import Nencho, { NenchoInsuranceStatus } from '@src/model/entity/nencho/nencho';

import { createNenchos } from '@src/model/nencho/nencho';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';
import { Employees } from '@src/model/entity';
import Tasks from '@src/model/entity/tasks';

export interface TaskManageData {
  allEmployeesNum: number;
  taskCompleteEmployeesNum: number;
  taskNotCompleteEmployeesNum: number;
}

const handler: Handler = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { task } = req.body;

    try {
      const employeeList: Employees[] = await readAllEmployees();
      const tasks: Tasks[] = employeeList.map((employee) => {
        const taskData: Tasks = new Tasks();
        taskData.title = task.title ?? '';
        taskData.summary = task.summary ?? '';
        taskData.explanation = task.explanation ?? '';
        taskData.dueDate = task.dueDate ?? '';
        taskData.empId = employee.empId ?? '';
        taskData.status = task.status ?? 0;
        return taskData;
      });

      const tasksInsertResult = await createTasks(tasks);

      const nenchos: Nencho[] = tasksInsertResult.identifiers
        .filter((taskInsertResult) => !!taskInsertResult.id)
        .map((taskInsertResult) => {
          const nenchoData: Nencho = new Nencho();
          nenchoData.id = taskInsertResult.id;
          nenchoData.nenchoInsuranceStatus = NenchoInsuranceStatus.NOT_COMPLETED;
          return nenchoData;
        });

      createNenchos(nenchos);

      return res.status(200).json({ message: 'tasks and nencho in bulk created' });
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const taskManageData: TaskManageData = {
      allEmployeesNum: 0,
      taskCompleteEmployeesNum: 0,
      taskNotCompleteEmployeesNum: 0,
    };

    const employees = await readAllLoginedEmployees();
    const tasks = await readTaskCompleteEmpIdBySignined();

    taskManageData.allEmployeesNum = employees.length;

    taskManageData.taskCompleteEmployeesNum = tasks.length;

    taskManageData.taskNotCompleteEmployeesNum =
      taskManageData.allEmployeesNum - taskManageData.taskCompleteEmployeesNum;

    res.status(200).json({ taskManageData });
  },
};
export default responder(handler);
