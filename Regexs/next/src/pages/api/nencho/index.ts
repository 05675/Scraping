import { NextApiRequest, NextApiResponse } from 'next';
import { create } from '@src/model/nencho/nencho';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';
import { InsertResult } from 'typeorm';

const handler: Handler = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { nencho, taskIdList } = req.body;
    try {
      const result: InsertResult[] = await Promise.all(
        taskIdList.map((id: string) => create({ ...nencho, id }))
      );
      if (result.length === 0) {
        return res.status(400).json({ message: '作成タスク件数0件' });
      }
      return res.status(200).json({ message: 'nencho in bulk created' });
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },
};
export default responder(handler);
