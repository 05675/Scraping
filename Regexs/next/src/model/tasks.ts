import { Repository } from 'typeorm';
import Tasks from './entity/tasks';
import { doAsyncWithLogging } from '../util/api/typeormUtils';

const doAsyncTaskProcess = async <TResult>(
  action: (repository: Repository<Tasks>) => Promise<TResult>
) => doAsyncWithLogging(Tasks, action);

export const create = async (task: Tasks) => {
  return doAsyncTaskProcess(async repository => repository.insert(task));
};

export const read = async (id: string) => {
  return doAsyncTaskProcess(async repository => repository.findOne(id));
};

export const readTasksByEmpId = async (empId: string) => {
  return doAsyncTaskProcess(async repository => repository.find({ empId }));
};

export const readAll = async () => {
  return doAsyncTaskProcess(async repository => repository.find());
};

export const update = async (id: string, tasks: Tasks) => {
  return doAsyncTaskProcess(async repository => repository.update({ id }, tasks));
};

export const destroy = async (id: string) => {
  return doAsyncTaskProcess(async repository => repository.delete({ id }));
};
