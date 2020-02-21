import { NextApiRequest, NextApiResponse } from 'next';
import { readAll, create } from '../../../model/groups';
import { Handler } from '../../../util/api/interface';
import responder from '../../../util/api/responder';

const handler: Handler = {
  get: async (_req: NextApiRequest, res: NextApiResponse) => {
    const groupList = await readAll();

    if (groupList) {
      return res.status(200).json({ groupList });
    }
    return res.status(404).json({ message: 'グループ情報が見つかりませんでした！' });
  },

  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const group = req.body;

    await create(group);

    return res.status(200).json({ message: 'group created' });
  },
};

export default responder(handler);
