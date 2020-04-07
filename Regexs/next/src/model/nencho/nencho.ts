import { Repository } from 'typeorm';
import { doAsyncWithLogging } from '@src/util/api/typeormUtils';
import Nencho, { NenchoInsuranceStatus } from '@src/model/entity/nencho/nencho';

const doAsyncNenchoProcess = async <TResult>(
  action: (repository: Repository<Nencho>) => Promise<TResult>
) => doAsyncWithLogging(Nencho, action);

export const create = async (nencho: Nencho) => {
  return doAsyncNenchoProcess(async (repository) => repository.insert(nencho));
};

export const read = async (id: string) => {
  return doAsyncNenchoProcess(async (repository) => repository.findOne(id));
};

export const update = async (id: string, nencho: Nencho) => {
  return doAsyncNenchoProcess(async (repository) => repository.update(id, nencho));
};

export const createNenchos = async (nencho: Nencho[]) => {
  return doAsyncNenchoProcess(async (repository) =>
    repository.createQueryBuilder().insert().into(Nencho).values(nencho).execute()
  );
};

export const updateNenchoInsuranceStatus = async (
  id: string,
  nenchoInsuranceStatus: NenchoInsuranceStatus
) => {
  return doAsyncNenchoProcess(async (repository) =>
    repository
      .createQueryBuilder()
      .update()
      .set({ nenchoInsuranceStatus })
      .where('id = :id', { id })
      .execute()
  );
};
