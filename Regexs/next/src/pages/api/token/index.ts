import { NextApiRequest, NextApiResponse } from 'next';
import { read, update } from '@src/model/employees';
import { Handler } from '@src/util/api/interface';
import responder from '@src/util/api/responder';
import { msg } from '@src/util/constantMsg';

/* eslint-disable*/
/**
 * @api {POST} /api/token サインインする
 * @apiName Signin
 * @apiGroup Signin
 * @apiParam {String} empId ユーザーID
 * @apiParam {String} empPassword パスワード
 * @apiSuccess {String} token 認証トークン
 * @apiSuccessExample {json} ログイン成功
 *     HTTP/1.1 200
 *     {
 *       "token": "0841"
 *     }
 * @apiErrorExample {json} ユーザーIDが存在しない
 *     HTTP/1.1 404
 *     {
 *       "message": "メールアドレスまたはパスワードが違います"
 *     }
 * @apiErrorExample {json} パスワードに誤りがある
 *     HTTP/1.1 401
 *     {
 *       "message": "メールアドレスまたはパスワードが違います"
 *     }
 */
/* eslint-enable */
const handler: Handler = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { empId, empPassword } = req.body;
    const employee = await read(empId);

    if (!employee) return res.status(404).json({ message: msg.WRONG_EMAIL_OR_PASSWORD });

    if (empPassword !== employee.empPassword)
      return res.status(401).json({ message: msg.WRONG_EMAIL_OR_PASSWORD });

    // ここでサインイン時間を書き込む
    employee.lastLoginAt = new Date().toISOString();
    await update(empId, employee);
    return res.status(200).json({ token: employee.empId });
  },
};

export default responder(handler);
