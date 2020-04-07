import { NextApiRequest, NextApiResponse } from 'next';
import { readAll, create, destroyAll } from '@src/model/tasks';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';

const handler: Handler = {
  // TODO: paging機能を追加したい。
  get: async (_req: NextApiRequest, res: NextApiResponse) => {
    const taskList = await readAll();
    return res.status(200).json({ taskList });
  },
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { task, empIdList } = req.body;

    const taskIdList = await Promise.all(
      empIdList.map(async (empId: string) => {
        const taskInsertResult = await create({ ...task, empId });
        return taskInsertResult.identifiers[0].id;
      })
    );
    return res.status(200).json({ message: 'tasks in bulk created', taskIdList });
  },

  // テーブルに存在するすべてのタスクを削除します。
  delete: async (req: NextApiRequest, res: NextApiResponse) => {
    await destroyAll();
    return res.status(204).end();
  },
};
export default responder(handler);
