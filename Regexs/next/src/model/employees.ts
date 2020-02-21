import { Repository } from 'typeorm';
import Employees from './entity/employees';
import { doAsyncWithLogging } from '../util/api/typeormUtils';

const doAsyncEmployeesProcess = async <TResult>(
  action: (repository: Repository<Employees>) => Promise<TResult>
) => doAsyncWithLogging(Employees, action);

export const create = async (employee: Employees) => {
  return doAsyncEmployeesProcess(async repository => repository.insert(employee));
};

export const read = async (empId: string) => {
  return doAsyncEmployeesProcess(async repository => repository.findOne(empId));
};

export const readAll = async () => {
  return doAsyncEmployeesProcess(async repository => repository.find());
};

export const update = async (empId: string, employee: Employees) => {
  return doAsyncEmployeesProcess(async repository => repository.update({ empId }, employee));
};

export const destroy = async (empId: string) => {
  return doAsyncEmployeesProcess(async repository => repository.delete({ empId }));
};
