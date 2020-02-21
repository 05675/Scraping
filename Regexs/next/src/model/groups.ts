import { Repository } from 'typeorm';
import Groups from './entity/groups';
import { doAsyncWithLogging } from '../util/api/typeormUtils';

const doAsyncGroupProcess = async <TResult>(
  action: (repository: Repository<Groups>) => Promise<TResult>
) => doAsyncWithLogging(Groups, action);

export const create = async (group: Groups) => {
  return doAsyncGroupProcess(async repository => repository.insert(group));
};

export const readAll = async () => {
  return doAsyncGroupProcess(async repository => repository.find());
};
