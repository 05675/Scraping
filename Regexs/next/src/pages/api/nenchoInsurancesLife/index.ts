import { Handler } from '@src/util/api/interface';
import { create } from '@src/model/nencho/nenchoInsuranceLifeInputs';
import { NextApiResponse, NextApiRequest } from 'next';
import responder from '@src/util/api/responder';
import NenchoInsuranceLifeInput2020 from '@src/model/entity/nencho/nenchoInsuranceLifeInputs';
import { updateNenchoInsuranceStatus } from '@src/model/nencho/nencho';
import { updateTasksStatus } from '@src/model/tasks';
import { NenchoInsuranceStatus } from '@src/model/entity/nencho/nencho';
import { TaskStatus } from '@src/model/entity/tasks';
import { isTaskDone, isTaskNotSubmitted } from './[id]';

const handler: Handler = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const nenchoInsuranceLifeInputs: NenchoInsuranceLifeInput2020 = req.body;
    const { nenchoId } = nenchoInsuranceLifeInputs;

    try {
      const result = await create(nenchoInsuranceLifeInputs);

      if (await isTaskDone(nenchoId)) {
        await updateNenchoInsuranceStatus(nenchoId, NenchoInsuranceStatus.NOT_SUBMITTED);
        await updateTasksStatus(nenchoId, TaskStatus.NOT_SUBMITTED);
      } else if (!(await isTaskNotSubmitted(nenchoId))) {
        await updateNenchoInsuranceStatus(nenchoId, NenchoInsuranceStatus.COMPLETED);
      }

      return res.status(201).json(result);
    } catch {
      return res.status(400).json({ message: '保存失敗' });
    }
  },
};

export default responder(handler);
