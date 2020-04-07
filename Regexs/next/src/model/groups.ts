import { Repository } from 'typeorm';
import { doAsyncWithLogging } from '@src/util/api/typeormUtils';
import Groups from './entity/groups';

const doAsyncGroupProcess = async <TResult>(
  action: (repository: Repository<Groups>) => Promise<TResult>
) => doAsyncWithLogging(Groups, action);

export const create = async (group: Groups) => {
  return doAsyncGroupProcess(async repository => repository.insert(group));
};

export const readAll = async () => {
  return doAsyncGroupProcess(async repository => repository.find());
};
