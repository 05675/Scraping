import { Handler } from '@src/util/api/interface';
import { NextApiResponse, NextApiRequest } from 'next';
import responder from '@src/util/api/responder';
import { readByNenchoId } from '@src/model/nencho/nenchoInsuranceLifeInputs';
import { read } from '@src/model/tasks';

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const nenchoId = req.query.nenchoId as string;
    try {
      if (undefined === (await read(nenchoId))) {
        return res.status(404).json({ message: 'タスクが見つかりません' });
      }
      const insurances = await readByNenchoId(nenchoId);
      if (insurances === undefined) {
        return res.status(400).json({ message: '保険料控除情報取得失敗' });
      }
      return res.status(200).json({ insurances });
    } catch {
      return res.status(500).json({ message: 'DBアクセスエラー' });
    }
  },
};

export default responder(handler);
