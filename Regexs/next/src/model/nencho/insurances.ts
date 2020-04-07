import { Repository } from 'typeorm';
import { doAsyncWithLogging } from '@src/util/api/typeormUtils';
import NenchoInsuranceLifeInput2020 from '@src/model/entity/nencho/nenchoInsuranceLifeInputs';

const doAsyncInsuranceProcess = async <TResult>(
  action: (repository: Repository<NenchoInsuranceLifeInput2020>) => Promise<TResult>
) => doAsyncWithLogging(NenchoInsuranceLifeInput2020, action);

export const read = async (nenchoId: string) => {
  return doAsyncInsuranceProcess(async repository => repository.find({ nenchoId }));
};
