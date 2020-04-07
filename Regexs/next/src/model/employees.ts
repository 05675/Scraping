import { Repository } from 'typeorm';
import { doAsyncWithLogging } from '@src/util/api/typeormUtils';
import Employees from './entity/employees';

const doAsyncEmployeesProcess = async <TResult>(
  action: (repository: Repository<Employees>) => Promise<TResult>
) => doAsyncWithLogging(Employees, action);

export const create = async (employee: Employees) => {
  return doAsyncEmployeesProcess(async repository => repository.insert(employee));
};

export const createMany = async (employees: Employees[]) => {
  return doAsyncEmployeesProcess(async repository => {
    await repository
      .createQueryBuilder()
      .insert()
      .into(Employees)
      .values(employees)
      .execute();
  });
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

/**
 *全従業員のログイン日時をnullにします。
 */
export const resetAllLoginAt = async () => {
  return doAsyncEmployeesProcess(async repository =>
    repository
      .createQueryBuilder()
      .update(Employees)
      .set({ lastLoginAt: undefined })
      .execute()
  );
};

export const readAllLoginedEmployees = async () => {
  return doAsyncEmployeesProcess(async repository =>
    repository
      .createQueryBuilder()
      .where('employees.last_login_at IS NOT NULL')
      .getMany()
  );
};

export const destroy = async (empId: string) => {
  return doAsyncEmployeesProcess(async repository => repository.delete({ empId }));
};

export const destroyAll = async () => {
  return doAsyncEmployeesProcess(async repository =>
    repository
      .createQueryBuilder()
      .delete()
      .from(Employees)
      .execute()
  );
};
