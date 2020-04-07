/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { InputWithLabel } from '@src/components/inputWithLabel';
import { SelectBoxWithLabel } from '@src/components/selectBoxWithLabel';
import {
  LifeInsuranceInputsProps,
  NenchoInsuranceLifeInput2020,
} from '@src/interfaces/lifeInsuranceInputs';
import {
  LifeInsuranceInputs,
  categoryOptions,
} from '@src/pages/nencho/[taskId]/lifeInsuranceInputs/[lifeInsuranceInputsId]';

import axios from 'axios';

import Router from 'next/router';
import { StyledButton } from '@src/styles';
import { errorMsg } from '@src/util/constantMsg';
import { InputYenWithLabel } from '@src/components/inputYenWithLabel';

jest.mock('axios');
(axios.put as any).mockImplementation(() => Promise.resolve({ status: 200, data: {} }));
(axios.post as any).mockImplementation(() => Promise.resolve({ status: 200, data: {} }));
(axios.get as any).mockImplementation(() => Promise.resolve({ status: 200, data: {} }));
(axios.delete as any).mockImplementation(() => Promise.resolve({ status: 200, data: {} }));

Router.push = jest.fn();

const lifeInsuranceDataDefault: NenchoInsuranceLifeInput2020 = {
  nenchoId: 'nenchoIdData',
  category: { id: 'insurance_0001', name: 'category' },
  firmName: 'firmNameData',
  categoryDetail: 'categoryDetailData',
  period: 'periodData',
  contractorName: 'contractorNameData',
  receiverName: 'receiverNameData',
  relation: 'relationData',
  payment: 'paymentData',
};

const propsDefault: LifeInsuranceInputsProps = {
  isUpdatePage: true,
  nenchoId: 'nenchoIdDummy',
  lifeInsuranceData: lifeInsuranceDataDefault,
};

const propsBlank: LifeInsuranceInputsProps = {
  isUpdatePage: false,
  nenchoId: 'nenchoIdDummy',
};

describe('snapshot', () => {
  test('default', () => {
    const snapshot = renderer.create(<LifeInsuranceInputs {...propsDefault} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});

describe('button 保存', () => {
  test('初期表示', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(target.length).toBe(1);

    expect(target.text()).toMatch('保存');
    expect(target.prop('important')).toBeTruthy();
    expect(target.prop('smallSize')).toBeTruthy();
    expect(target.prop('onClick')?.name).toMatch('handleClickForUpsert');
  });
});

describe('SelectBoxWithLabel 加入している生命保険', () => {
  test('初期表示：初期値なし', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(SelectBoxWithLabel).find('[name="category"]');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('加入している生命保険');
    expect(target.prop('value')).toMatch('');
    expect(target.prop('options')).toEqual(categoryOptions);
    expect(target.prop('onChange')?.name).toMatch('handleChangeForSelectInsuranceCategory');
    expect(target.prop('isError')).toBeFalsy();
    expect(target.prop('errorMessage')).toMatch('');
  });
  test('初期表示：初期値あり', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsDefault} />);
    const target = nextPage.find(SelectBoxWithLabel).find('[name="category"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('insurance_0001');
  });
  test('バリデーションエラー：未入力', () => {
    const nextPagePre = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPagePre.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    saveInputButton.simulate('click');

    // Stateが更新されたのでupdateが必要
    const nextPage = nextPagePre.update();
    const target = nextPage.find(SelectBoxWithLabel).find('[name="category"]');
    expect(target.length).toBe(1);

    expect(target.prop('isError')).toBeTruthy();
    expect(target.prop('errorMessage')).toMatch(errorMsg.VALIDATE_ERR_EMPTY_CATEGORY);
  });
});

describe('InputWithLabel 保険会社等の名称', () => {
  test('初期表示：初期値なし', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(InputWithLabel).find('[name="firmName"]');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('保険会社等の名称');
    expect(target.prop('value')).toMatch('');
    expect(target.prop('onChange')?.name).toMatch('handleChange');
    expect(target.prop('isError')).toBeFalsy();
    expect(target.prop('errorMessage')).toMatch('');
    expect(target.prop('maxLength')).toBe(36);
  });
  test('初期表示：初期値あり', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsDefault} />);
    const target = nextPage.find(InputWithLabel).find('[name="firmName"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('firmNameData');
  });
  test('バリデーションエラー：未入力', () => {
    const nextPagePre = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPagePre.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    saveInputButton.simulate('click');

    // Stateが更新されたのでupdateが必要
    const nextPage = nextPagePre.update();
    const target = nextPage.find(InputWithLabel).find('[name="firmName"]');
    expect(target.length).toBe(1);

    expect(target.prop('isError')).toBeTruthy();
    expect(target.prop('errorMessage')).toMatch(errorMsg.VALIDATE_ERR_EMPTY_FIRM_NAME);
  });
});

describe('InputWithLabel 保険等の種類', () => {
  test('初期表示：初期値なし', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(InputWithLabel).find('[name="categoryDetail"]');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('保険等の種類');
    expect(target.prop('value')).toMatch('');
    expect(target.prop('onChange')?.name).toMatch('handleChange');
    expect(target.prop('isError')).toBeFalsy();
    expect(target.prop('errorMessage')).toMatch('');
    expect(target.prop('maxLength')).toBe(36);
  });
  test('初期表示：初期値あり', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsDefault} />);
    const target = nextPage.find(InputWithLabel).find('[name="categoryDetail"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('categoryDetailData');
  });
  test('バリデーションエラー：未入力', () => {
    const nextPagePre = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPagePre.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    saveInputButton.simulate('click');

    // Stateが更新されたのでupdateが必要
    const nextPage = nextPagePre.update();
    const target = nextPage.find(InputWithLabel).find('[name="categoryDetail"]');
    expect(target.length).toBe(1);

    expect(target.prop('isError')).toBeTruthy();
    expect(target.prop('errorMessage')).toMatch(errorMsg.VALIDATE_ERR_EMPTY_CATEGORY_DETAIL);
  });
});

describe('InputWithLabel 保険期間', () => {
  test('初期表示：初期値なし', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(InputWithLabel).find('[name="period"]');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('保険期間');
    expect(target.prop('value')).toMatch('');
    expect(target.prop('onChange')?.name).toMatch('handleChange');
    expect(target.prop('isError')).toBeFalsy();
    expect(target.prop('errorMessage')).toMatch('');
    expect(target.prop('maxLength')).toBe(36);
  });
  test('初期表示：初期値あり', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsDefault} />);
    const target = nextPage.find(InputWithLabel).find('[name="period"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('periodData');
  });
  test('バリデーションエラー：未入力', () => {
    const nextPagePre = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPagePre.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    saveInputButton.simulate('click');

    // Stateが更新されたのでupdateが必要
    const nextPage = nextPagePre.update();
    const target = nextPage.find(InputWithLabel).find('[name="period"]');
    expect(target.length).toBe(1);

    expect(target.prop('isError')).toBeTruthy();
    expect(target.prop('errorMessage')).toMatch(errorMsg.VALIDATE_ERR_EMPTY_PERIOD);
  });
});

describe('InputWithLabel 保険等の契約者の氏名', () => {
  test('初期表示：初期値なし', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(InputWithLabel).find('[name="contractorName"]');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('保険等の契約者の氏名');
    expect(target.prop('value')).toMatch('');
    expect(target.prop('onChange')?.name).toMatch('handleChange');
    expect(target.prop('isError')).toBeFalsy();
    expect(target.prop('errorMessage')).toMatch('');
    expect(target.prop('maxLength')).toBe(36);
  });
  test('初期表示：初期値あり', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsDefault} />);
    const target = nextPage.find(InputWithLabel).find('[name="contractorName"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('contractorNameData');
  });
  test('バリデーションエラー：未入力', () => {
    const nextPagePre = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPagePre.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    saveInputButton.simulate('click');

    // Stateが更新されたのでupdateが必要
    const nextPage = nextPagePre.update();
    const target = nextPage.find(InputWithLabel).find('[name="contractorName"]');
    expect(target.length).toBe(1);

    expect(target.prop('isError')).toBeTruthy();
    expect(target.prop('errorMessage')).toMatch(errorMsg.VALIDATE_ERR_EMPTY_CONTRACTOR_NAME);
  });
});

describe('InputWithLabel 保険金等の受取人 氏名', () => {
  test('初期表示：初期値なし', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(InputWithLabel).find('[name="receiverName"]');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('氏名');
    expect(target.prop('value')).toMatch('');
    expect(target.prop('onChange')?.name).toMatch('handleChange');
    expect(target.prop('isError')).toBeFalsy();
    expect(target.prop('errorMessage')).toMatch('');
    expect(target.prop('maxLength')).toBe(36);
  });
  test('初期表示：初期値あり', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsDefault} />);
    const target = nextPage.find(InputWithLabel).find('[name="receiverName"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('receiverNameData');
  });
  test('バリデーションエラー：未入力', () => {
    const nextPagePre = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPagePre.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    saveInputButton.simulate('click');

    // Stateが更新されたのでupdateが必要
    const nextPage = nextPagePre.update();
    const target = nextPage.find(InputWithLabel).find('[name="receiverName"]');
    expect(target.length).toBe(1);

    expect(target.prop('isError')).toBeTruthy();
    expect(target.prop('errorMessage')).toMatch(errorMsg.VALIDATE_ERR_EMPTY_RECEIVER_NAME);
  });
});

describe('InputWithLabel 保険金等の受取人 あなたとの続柄', () => {
  test('初期表示：初期値なし', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(InputWithLabel).find('[name="relation"]');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('あなたとの続柄');
    expect(target.prop('value')).toMatch('');
    expect(target.prop('onChange')?.name).toMatch('handleChange');
    expect(target.prop('isError')).toBeFalsy();
    expect(target.prop('errorMessage')).toMatch('');
    expect(target.prop('maxLength')).toBe(6);
  });
  test('初期表示：初期値あり', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsDefault} />);
    const target = nextPage.find(InputWithLabel).find('[name="relation"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('relationData');
  });
  test('バリデーションエラー：未入力', () => {
    const nextPagePre = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPagePre.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    saveInputButton.simulate('click');

    // Stateが更新されたのでupdateが必要
    const nextPage = nextPagePre.update();
    const target = nextPage.find(InputWithLabel).find('[name="relation"]');
    expect(target.length).toBe(1);

    expect(target.prop('isError')).toBeTruthy();
    expect(target.prop('errorMessage')).toMatch(errorMsg.VALIDATE_ERR_EMPTY_RELATION);
  });
});

describe('InputWithLabel 申請額', () => {
  test('初期表示：初期値なし', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(InputYenWithLabel).find('[name="payment"]');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('申請額');
    expect(target.prop('value')).toMatch('');
    expect(target.prop('onChange')?.name).toMatch('handleChange');
    expect(target.prop('isError')).toBeFalsy();
    expect(target.prop('errorMessage')).toMatch('');
    expect(target.prop('maxLength')).toBe(8);
    expect(target.prop('type')).toMatch('tel');
  });
  test('初期表示：初期値あり', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsDefault} />);
    const target = nextPage.find(InputYenWithLabel).find('[name="payment"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('paymentData');
  });
  test('バリデーションエラー：未入力', () => {
    const nextPagePre = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPagePre.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    saveInputButton.simulate('click');

    // Stateが更新されたのでupdateが必要
    const nextPage = nextPagePre.update();
    const target = nextPage.find(InputYenWithLabel).find('[name="payment"]');
    expect(target.length).toBe(1);

    expect(target.prop('isError')).toBeTruthy();
    expect(target.prop('errorMessage')).toMatch(errorMsg.VALIDATE_ERR_EMPTY_PAYMENT);
  });
  test('入力制限：数字10桁', () => {
    let nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPage.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    let target = nextPage.find(InputYenWithLabel).find('[name="payment"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('');

    target.simulate('change', {
      target: { name: 'payment', value: '1234567890' },
    });
    nextPage = nextPage.update();
    target = nextPage.find(InputYenWithLabel).find('[name="payment"]');
    expect(target.length).toBe(1);
    expect(target.prop('value')).toMatch('1234567890');
  });
  test('入力制限：数字11桁', () => {
    let nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPage.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    let target = nextPage.find(InputYenWithLabel).find('[name="payment"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('');

    target.simulate('change', {
      target: { name: 'payment', value: '12345678901' },
    });
    nextPage = nextPage.update();
    target = nextPage.find(InputYenWithLabel).find('[name="payment"]');
    expect(target.length).toBe(1);
    expect(target.prop('value')).toMatch('1234567890');
  });
  test('入力制限：数字以外', () => {
    let nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const saveInputButton = nextPage.find(StyledButton).find('[name="saveLifeInsurance"]');
    expect(saveInputButton.length).toBe(1);
    let target = nextPage.find(InputYenWithLabel).find('[name="payment"]');
    expect(target.length).toBe(1);

    expect(target.prop('value')).toMatch('');

    target.simulate('change', {
      target: { name: 'payment', value: '001*2あ3ア4ｱ5a6A7' },
    });
    nextPage = nextPage.update();
    target = nextPage.find(InputYenWithLabel).find('[name="payment"]');
    expect(target.length).toBe(1);
    expect(target.prop('value')).toMatch('1234567');
  });
});

describe('button この保険を削除する', () => {
  test('初期表示：isUpdatePage=false', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsBlank} />);
    const target = nextPage.find(StyledButton).find('[name="deleteLifeInsurance"]');
    expect(target.length).toBe(0);
  });
  test('初期表示：isUpdatePage=true', () => {
    const nextPage = shallow(<LifeInsuranceInputs {...propsDefault} />);
    const target = nextPage.find(StyledButton).find('[name="deleteLifeInsurance"]');
    expect(target.length).toBe(1);

    expect(target.text()).toMatch('この保険を削除する');
    expect(target.prop('warning')).toBeTruthy();
    expect(target.prop('onClick')?.name).toMatch('confirm');
  });
});
