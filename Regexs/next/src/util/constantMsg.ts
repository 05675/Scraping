interface Msg {
  [msg: string]: string;
}

export const msg: Msg = {
  // メッセージ)
  WRONG_EMAIL_OR_PASSWORD: 'メールアドレスまたはパスワードが違います',
  ENTER_ID_OR_EMAIL: '弥生IDまたはメールアドレスを入力してください',
  NO_REGISTRATION: '登録はありません',
  SAVED_INSURANCE_INFO: '保険情報を保存しました',
};

export const errorMsg: Msg = {
  // バリデーションエラー
  VALIDATE_ERR_EMPTY_CATEGORY: '加入している生命保険を選択してください',
  VALIDATE_ERR_EMPTY_FIRM_NAME: '保険会社等の名称を入力してください',
  VALIDATE_ERR_EMPTY_CATEGORY_DETAIL: '保険等の種類を入力してください',
  VALIDATE_ERR_EMPTY_PERIOD: '保険期間を入力してください',
  VALIDATE_ERR_EMPTY_CONTRACTOR_NAME: '保険等の契約者の氏名を入力してください',
  VALIDATE_ERR_EMPTY_RECEIVER_NAME: '保険金等の受取人の氏名を入力してください',
  VALIDATE_ERR_EMPTY_RELATION: '保険金等の受取人の続柄を入力してください',
  VALIDATE_ERR_EMPTY_PAYMENT: '申告額を入力してください',
};
