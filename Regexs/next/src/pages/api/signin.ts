import { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../model/employees';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { id, password } = request.body;
  const employee = await read(id);

  if (!employee) return response.status(404).json({ message: 'id does not exist' });

  if (password !== employee.empPassword)
    return response.status(401).json({ message: 'password is incorrect' });

  return response.status(200).json({ token: employee.empId });
};
