import { NextApiRequest, NextApiResponse } from 'next';
import { read, update, destroy } from '../../../../model/employees';
import { Handler } from '../../../../util/api/interface';
import responder from '../../../../util/api/responder';

const handler: Handler = {
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const employee = await read(empId);
    if (!employee) return res.status(404).json({ message: `employee of ${empId} does not exist` });

    return res.status(200).json({ employee });
  },

  put: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const isExist = await read(empId);
    if (!isExist) return res.status(404).json({ message: `employee of ${empId} does not exist` });

    await update(empId, req.body);

    return res.status(200).json({ message: 'employee updated' });
  },

  delete: async (req: NextApiRequest, res: NextApiResponse) => {
    const empId = req.query.empId as string;
    const isExist = await read(empId);
    if (!isExist) return res.status(404).json({ message: `employee of ${empId} does not exist` });

    await destroy(empId);

    return res.status(200).json({ message: 'employee deleted' });
  },
};

export default responder(handler);
