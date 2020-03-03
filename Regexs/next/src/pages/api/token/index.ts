import { NextApiRequest, NextApiResponse } from 'next';
import { read, update } from '@src/model/employees';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';

const handler: Handler = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { empId, empPassword } = req.body;
    const employee = await read(empId);

    if (!employee) return res.status(404).json({ message: 'id does not exist' });

    if (empPassword !== employee.empPassword)
      return res.status(401).json({ message: 'password is incorrect' });

    // ここでログイン時間を書き込む
    employee.lastLoginAt = new Date().toISOString();
    await update(empId, employee);
    return res.status(200).json({ token: employee.empId });
  },
};

export default responder(handler);
