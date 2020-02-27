import { ObjectType, EntitySchema, Repository } from 'typeorm';
import getConnection from '../../model/getConnection';

export const doAsyncWithLogging = async <T, TResult>(
  entity: ObjectType<T> | EntitySchema<T> | string,
  action: (repository: Repository<T>) => Promise<TResult>
): Promise<TResult> => {
  try {
    const connection = await getConnection();
    const repository = connection.getRepository(entity);
    return action(repository);
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
