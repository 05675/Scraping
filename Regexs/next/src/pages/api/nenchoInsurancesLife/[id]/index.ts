import { Handler } from '@src/util/api/interface';
import { NextApiResponse, NextApiRequest } from 'next';
import responder from '@src/util/api/responder';
import { read, destroy, update } from '@src/model/nencho/nenchoInsuranceLifeInputs';
import NenchoInsuranceLifeInput2020 from '@src/model/entity/nencho/nenchoInsuranceLifeInputs';
import { updateNenchoInsuranceStatus } from '@src/model/nencho/nencho';
import { read as readTasks, updateTasksStatus } from '@src/model/tasks';
import { NenchoInsuranceStatus } from '@src/model/entity/nencho/nencho';
import { TaskStatus } from '@src/model/entity/tasks';

// TODO: transactionを利用して複数のqueryを纏める。

export const isTaskDone = async (taskId: string) => {
  const task = await readTasks(taskId);
  return task && task.status === TaskStatus.DONE;
};

export const isTaskNotSubmitted = async (taskId: string) => {
  const task = await readTasks(taskId);
  return task && task.status === TaskStatus.NOT_SUBMITTED;
};

const updateAllStatusToNotSubmittedOrDefaultStatus = async (taskId: string) => {
  if (await isTaskDone(taskId)) {
    await updateNenchoInsuranceStatus(taskId, NenchoInsuranceStatus.NOT_SUBMITTED);
    await updateTasksStatus(taskId, TaskStatus.NOT_SUBMITTED);
  }
};

const updateAllStatusToNotSubmitted = async (taskId: string) => {
  if (await isTaskDone(taskId)) {
    await updateNenchoInsuranceStatus(taskId, NenchoInsuranceStatus.NOT_SUBMITTED);
    await updateTasksStatus(taskId, TaskStatus.NOT_SUBMITTED);
  }
};

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const id: string = req.query.id as string;
    try {
      const result = await read(parseInt(id, 10));
      if (result === undefined) {
        return res.status(404).json({ message: '保険料入力情報取得失敗' });
      }
      return res.status(200).json(result);
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },

  delete: async (req: NextApiRequest, res: NextApiResponse) => {
    const id: string = req.query.id as string;

    try {
      const insuranceInput = await read(parseInt(id, 10));
      if (!insuranceInput) {
        return res.status(404).json({ message: '生命保険情報が見つかりませんでした！' });
      }

      const result = await destroy(parseInt(id, 10));
      if (result.raw.affectedRows === 0) {
        return res.status(400).json({ message: '反映個所無し' });
      }

      await updateAllStatusToNotSubmittedOrDefaultStatus(insuranceInput.nenchoId);

      return res.status(204).end();
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },

  put: async (req: NextApiRequest, res: NextApiResponse) => {
    const id: string = req.query.id as string;
    const inputContent: NenchoInsuranceLifeInput2020 = req.body;

    try {
      await updateAllStatusToNotSubmitted(inputContent.nenchoId);

      const result = await update(parseInt(id, 10), inputContent);
      if (result.raw.affectedRows === 0) {
        return res.status(400).json({ message: '反映個所無し' });
      }

      return res.status(200).json(result);
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },
};

export default responder(handler);
