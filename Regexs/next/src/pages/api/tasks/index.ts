import { NextApiRequest, NextApiResponse } from 'next';
import { readAll, create } from '../../../model/tasks';
import { Handler } from '../../../util/api/interface';
import responder from '../../../util/api/responder';

const handler: Handler = {
  // TODO: paging機能を追加したい。
  get: async (_req: NextApiRequest, res: NextApiResponse) => {
    const taskList = await readAll();
    return res.status(200).json({ taskList });
  },
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { task } = req.body;
    const { empIdList } = req.body;
    await Promise.all(empIdList.map((empId: string) => create({ ...task, empId })));
    return res.status(200).json({ message: 'tasks in bulk created' });
  },
};
export default responder(handler);
