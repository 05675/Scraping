import { Handler } from '@src/util/api/interface';
import { NextApiResponse, NextApiRequest } from 'next';
import responder from '@src/util/api/responder';
import { read } from '@src/model/nencho/nencho';

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.nenchoId as string;
    try {
      const result = await read(id);
      if (result === undefined) {
        return res.status(404).json({ message: '年調タスクが見つかりませんでした。' });
      }
      return res.status(200).json(result);
    } catch {
      return res.status(500).json({ message: `DBアクセスエラー` });
    }
  },
};

export default responder(handler);
