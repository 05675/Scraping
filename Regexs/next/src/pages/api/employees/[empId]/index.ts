import { NextApiRequest, NextApiResponse } from 'next';
import { read, update, destroy } from '@src/model/employees';
import { Handler } from '@src/util/api/interface';
import contractableResponder from '@src/util/api/contractableResponder';

// 下階層のAPIで使うことのできる契約条件です。
export const hasEmplpyees = async (req: NextApiRequest, res: NextApiResponse) => {
  const empId = req.query.empId as string;
  const employee = await read(empId);
  return employee || res.status(404).json({ message: `employee of ${empId} does not exist` });
};

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const employee = await hasEmplpyees(req, res);
    if (!employee) return;

    res.status(200).json({ employee });
  },

  put: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    await update(empId, req.body);
    return res.status(200).json({ message: 'employee updated' });
  },

  delete: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    await destroy(empId);
    return res.status(200).json({ message: 'employee deleted' });
  },
};

const hasEmplpyeesOrGet = async (req: NextApiRequest, res: NextApiResponse, method: string) => {
  return method === 'get' || hasEmplpyees(req, res);
};

// get もしくは指定IDの Employees が有ることを動作条件とします。
export default contractableResponder(handler, hasEmplpyeesOrGet);
