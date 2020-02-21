import { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../model/employees';
import { Handler } from '../../../util/api/interface';
import responder from '../../../util/api/responder';

const handler: Handler = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { empId, empPassword } = req.body;
    const employee = await read(empId);

    if (!employee) return res.status(404).json({ message: 'id does not exist' });

    if (empPassword !== employee.empPassword)
      return res.status(401).json({ message: 'password is incorrect' });

    return res.status(200).json({ token: employee.empId });
  },
};

export default responder(handler);
