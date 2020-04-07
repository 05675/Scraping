import { Repository } from 'typeorm';
import { doAsyncWithLogging } from '@src/util/api/typeormUtils';
import Tasks, { TaskStatus } from '@src/model/entity/tasks';
import Employees from '@src/model/entity/employees';

const doAsyncTaskProcess = async <TResult>(
  action: (repository: Repository<Tasks>) => Promise<TResult>
) => doAsyncWithLogging(Tasks, action);

export const create = async (task: Tasks) => {
  return doAsyncTaskProcess(async (repository) => repository.insert(task));
};

export const read = async (id: string) => {
  return doAsyncTaskProcess(async (repository) => repository.findOne(id));
};

export const readTasksByEmpId = async (empId: string) => {
  return doAsyncTaskProcess(async (repository) => repository.find({ empId }));
};

export const createTasks = async (tasks: Tasks[]) => {
  return doAsyncTaskProcess(async (repository) =>
    repository.createQueryBuilder().insert().into(Tasks).values(tasks).execute()
  );
};

export const readTaskCompleteEmpIdBySignined = async () => {
  return doAsyncTaskProcess(async (repository) =>
    repository
      .createQueryBuilder('tasks')
      .select('tasks.emp_id', 'empId')
      .innerJoin(Employees, 'employees', 'employees.emp_id = tasks.emp_id')
      .where('employees.last_login_at IS NOT NULL')
      .andWhere('tasks.status != :newStatus', { newStatus: TaskStatus.NEW })
      .groupBy('tasks.emp_id')
      .getRawMany()
  );
};

export const readAll = async () => {
  return doAsyncTaskProcess(async (repository) => repository.find());
};

export const update = async (id: string, tasks: Tasks) => {
  return doAsyncTaskProcess(async (repository) => repository.update({ id }, tasks));
};

export const updateTasksStatus = async (id: string, status: TaskStatus) => {
  return doAsyncTaskProcess((repository) =>
    repository.createQueryBuilder().update().set({ status }).where('id = :id', { id }).execute()
  );
};

export const destroy = async (id: string) => {
  return doAsyncTaskProcess(async (repository) => repository.delete({ id }));
};

export const destroyAll = async () => {
  return doAsyncTaskProcess(async (repository) =>
    repository.createQueryBuilder().delete().from(Tasks).execute()
  );
};
