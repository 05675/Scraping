import { NextApiRequest, NextApiResponse } from 'next';
import { updateTasksStatus, read } from '@src/model/tasks';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';
import { TaskStatus } from '@src/model/entity/tasks';
import { updateNenchoInsuranceStatus } from '@src/model/nencho/nencho';
import { NenchoInsuranceStatus } from '@src/model/entity/nencho/nencho';

const handler: Handler = {
  // 提出するボタン押下時に呼び出してもらう。
  put: async (req: NextApiRequest, res: NextApiResponse) => {
    const taskId = req.query.nenchoId as string;
    const task = await read(taskId);
    if (task === undefined) {
      return res.status(404).json({ message: 'タスクが見つかりませんでした！' });
    }

    await updateNenchoInsuranceStatus(taskId, NenchoInsuranceStatus.COMPLETED);
    const updated = await updateTasksStatus(taskId, TaskStatus.DONE);

    return res.status(200).json({ updated });
  },
};
export default responder(handler);
