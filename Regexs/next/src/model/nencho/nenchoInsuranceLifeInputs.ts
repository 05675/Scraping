import { Repository, SelectQueryBuilder } from 'typeorm';
import { doAsyncWithLogging } from '@src/util/api/typeormUtils';
import NenchoInsuranceLifeInput2020 from '@src/model/entity/nencho/nenchoInsuranceLifeInputs';

const doAsyncNenchoInsuranceLifeInputsProcess = async <TResult>(
  action: (repository: Repository<NenchoInsuranceLifeInput2020>) => Promise<TResult>
) => doAsyncWithLogging(NenchoInsuranceLifeInput2020, action);

export const getJoinTable = (
  repository: Repository<NenchoInsuranceLifeInput2020>
): SelectQueryBuilder<NenchoInsuranceLifeInput2020> =>
  repository
    .createQueryBuilder('nencho_insurance_life_input_2020')
    .leftJoinAndSelect('nencho_insurance_life_input_2020.category', 'insurance_categories');

export const create = async (nenchoInsuranceLifeInput2020: NenchoInsuranceLifeInput2020) => {
  return doAsyncNenchoInsuranceLifeInputsProcess(async repository =>
    repository.insert(nenchoInsuranceLifeInput2020)
  );
};

export const destroy = async (id: number) => {
  return doAsyncNenchoInsuranceLifeInputsProcess(async repository => repository.delete(id));
};

export const readAll = async () => {
  return doAsyncNenchoInsuranceLifeInputsProcess(async repository => {
    return repository.find();
  });
};

export const read = async (id: number) => {
  return doAsyncNenchoInsuranceLifeInputsProcess(async repository => {
    const joinTable = getJoinTable(repository);
    const queryJoinTable = joinTable.where('nencho_insurance_life_input_2020.id = :id', { id });
    let readValue: NenchoInsuranceLifeInput2020 | undefined = {
      nenchoId: '',
    };
    await queryJoinTable
      .getOne()
      .then(value => {
        if (value === undefined) {
          throw new Error('保険料情報が見つからなかった');
        }
        readValue = value;
      })
      .catch(reason => {
        console.error(`エラーの原因：${reason}`);
        readValue = undefined;
      });
    return readValue;
  });
};

export const readByNenchoId = async (nenchoId: string) => {
  return doAsyncNenchoInsuranceLifeInputsProcess(async repository => {
    const joinTable = getJoinTable(repository);
    const queryJoinTable = joinTable.where(
      'nencho_insurance_life_input_2020.nencho_id = :nencho_id',
      { nencho_id: nenchoId }
    );
    let readValue: NenchoInsuranceLifeInput2020[] | undefined = [];
    await queryJoinTable
      .getMany()
      .then(value => {
        if (value === undefined) {
          throw new Error('年調IDから保険料情報が見つからなかった');
        }
        readValue = value;
      })
      .catch(reason => {
        console.error(`エラーの原因：${reason}`);
        readValue = undefined;
      });

    return readValue;
  });
};

export const update = async (
  id: number,
  nenchoInsuranceLifeInput2020: NenchoInsuranceLifeInput2020
) => {
  return doAsyncNenchoInsuranceLifeInputsProcess(async repository =>
    repository.update(id, nenchoInsuranceLifeInput2020)
  );
};
