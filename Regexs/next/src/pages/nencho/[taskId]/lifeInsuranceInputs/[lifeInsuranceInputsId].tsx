import React, { useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import axios from 'axios';
import { StyledLabel, StyledText, StyledTitle, StyledButton } from '@src/styles';
import { SelectBoxWithLabel } from '@src/components/selectBoxWithLabel';
import { InputWithLabel } from '@src/components/inputWithLabel';
import { InputYenWithLabel } from '@src/components/inputYenWithLabel';
import { withAuthSync } from '@src/util/auth';
import {
  OptionType,
  NenchoInsuranceLifeInput2020,
  LifeInsuranceInputsProps,
  NenchoInsuranceLifeInput2020Validate,
} from '@src/interfaces/lifeInsuranceInputs';
import { withPreventDefault } from '@src/util/withPreventDefault';
import { apiUrl } from '@src/util/apiUrl';
import { PageInfo } from '@src/interfaces/pageInfo';
import Headroom from 'react-headroom';
import { InsuranceCategories } from '@src/model/entity';
import { NotificationError } from '@src/components/notificationerror';
import { errorMsg } from '@src/util/constantMsg';
import { CommonConfirmAlert } from '@src/components/commonConfirmAlert';

export const categoryOptions: OptionType[] = [
  { key: 'category', label: '一般の生命保険：新制度', value: 'insurance_0001' },
  { key: 'category', label: '一般の生命保険：旧制度', value: 'insurance_0002' },
  { key: 'category', label: '介護医療保険：新制度', value: 'insurance_0003' },
  { key: 'category', label: '個人年金保険：新制度', value: 'insurance_0004' },
  { key: 'category', label: '個人年金保険：旧制度', value: 'insurance_0005' },
];

const LIFEINSURANCE_API_URL = '/api/nenchoInsurancesLife';

const initialState: NenchoInsuranceLifeInput2020 = {
  nenchoId: '',
  category: { id: '', name: '' },
  firmName: '',
  categoryDetail: '',
  period: '',
  contractorName: '',
  receiverName: '',
  relation: '',
  payment: '',
};

const initialValidateState: NenchoInsuranceLifeInput2020Validate = {
  category: { isError: false, errorMessage: '' },
  firmName: { isError: false, errorMessage: '' },
  categoryDetail: { isError: false, errorMessage: '' },
  period: { isError: false, errorMessage: '' },
  contractorName: { isError: false, errorMessage: '' },
  receiverName: { isError: false, errorMessage: '' },
  relation: { isError: false, errorMessage: '' },
  payment: { isError: false, errorMessage: '' },
};

/**
 * 生命保険入力画面
 *
 * @returns {*} Reactコンポーネント
 */
export const LifeInsuranceInputs: NextPage<LifeInsuranceInputsProps> = ({
  isUpdatePage,
  nenchoId,
  lifeInsuranceData,
  errorInfo,
}) => {
  // TODO: Error, validation
  const [lifeInsurance, setLifeInsurance] = useState<NenchoInsuranceLifeInput2020>(
    lifeInsuranceData || initialState
  );
  const [validateState, setValidateState] = useState<NenchoInsuranceLifeInput2020Validate>(
    initialValidateState
  );

  const [formIsChanged, setFormIsChanged] = React.useState(false);
  const [isNotification, setIsNotification] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(
    errorInfo === undefined ? '' : errorInfo.message
  );
  const errorDisplayFlg = errorInfo === undefined ? false : errorInfo.isError;
  React.useEffect(() => {
    setTimeout(() => setIsNotification(errorDisplayFlg), 0);
  }, [errorDisplayFlg]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLifeInsurance({ ...lifeInsurance, [name]: value });
    setValidateState({
      ...validateState,
      [name]: { isError: false, errorMessage: '' },
    });
    setFormIsChanged(true);
  };

  const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const replaceValue = value.replace(/^0+|[^0-9]/g, '');
    setLifeInsurance({ ...lifeInsurance, [name]: replaceValue.substr(0, 10) });
    setValidateState({
      ...validateState,
      [name]: { isError: false, errorMessage: '' },
    });
    setFormIsChanged(true);
  };

  const handleChangeForSelectInsuranceCategory = (selectedOption: OptionType) => {
    const selectedValue = selectedOption.value as string;
    const selectedKey = selectedOption.key;
    const selectedCategory: InsuranceCategories = { id: selectedValue, name: selectedKey };
    setLifeInsurance({ ...lifeInsurance, category: selectedCategory });
    setValidateState({
      ...validateState,
      category: { isError: false, errorMessage: '' },
    });
    setFormIsChanged(true);
  };

  const validateForm = () => {
    let isValid = true;
    const validateResultState = {
      category: { isError: false, errorMessage: '' },
      firmName: { isError: false, errorMessage: '' },
      categoryDetail: { isError: false, errorMessage: '' },
      period: { isError: false, errorMessage: '' },
      contractorName: { isError: false, errorMessage: '' },
      receiverName: { isError: false, errorMessage: '' },
      relation: { isError: false, errorMessage: '' },
      payment: { isError: false, errorMessage: '' },
    };

    // 未入力チェック
    if (!lifeInsurance.category.id) {
      validateResultState.category = {
        isError: true,
        errorMessage: errorMsg.VALIDATE_ERR_EMPTY_CATEGORY,
      };
      isValid = false;
    }
    if (!lifeInsurance.firmName) {
      validateResultState.firmName = {
        isError: true,
        errorMessage: errorMsg.VALIDATE_ERR_EMPTY_FIRM_NAME,
      };
      isValid = false;
    }
    if (!lifeInsurance.categoryDetail) {
      validateResultState.categoryDetail = {
        isError: true,
        errorMessage: errorMsg.VALIDATE_ERR_EMPTY_CATEGORY_DETAIL,
      };
      isValid = false;
    }
    if (!lifeInsurance.period) {
      validateResultState.period = {
        isError: true,
        errorMessage: errorMsg.VALIDATE_ERR_EMPTY_PERIOD,
      };
      isValid = false;
    }
    if (!lifeInsurance.contractorName) {
      validateResultState.contractorName = {
        isError: true,
        errorMessage: errorMsg.VALIDATE_ERR_EMPTY_CONTRACTOR_NAME,
      };
      isValid = false;
    }
    if (!lifeInsurance.receiverName) {
      validateResultState.receiverName = {
        isError: true,
        errorMessage: errorMsg.VALIDATE_ERR_EMPTY_RECEIVER_NAME,
      };
      isValid = false;
    }
    if (!lifeInsurance.relation) {
      validateResultState.relation = {
        isError: true,
        errorMessage: errorMsg.VALIDATE_ERR_EMPTY_RELATION,
      };
      isValid = false;
    }
    if (!lifeInsurance.payment) {
      validateResultState.payment = {
        isError: true,
        errorMessage: errorMsg.VALIDATE_ERR_EMPTY_PAYMENT,
      };
      isValid = false;
    }

    setValidateState(validateResultState);
    return isValid;
  };

  const lifeInsuranceUpsert = withPreventDefault(async () => {
    try {
      if (isUpdatePage)
        await axios.put(`${LIFEINSURANCE_API_URL}/${lifeInsurance.id}`, lifeInsurance);
      else await axios.post(LIFEINSURANCE_API_URL, { ...lifeInsurance, nenchoId });

      Router.push(`/nencho/${nenchoId}/insurances`, {
        pathname: `/nencho/${nenchoId}/insurances`,
        query: { insuranceRegister: true },
      });
    } catch (error) {
      setErrorMessage(`${error.message}:${error.response.data.message}`);
      setIsNotification(true);
    }
  });

  const handleClickForUpsert = (event: React.SyntheticEvent<Element, Event>) => {
    if (!validateForm()) return;
    lifeInsuranceUpsert(event);
  };

  const handleClickForDelete = async () => {
    try {
      await axios.delete(`${LIFEINSURANCE_API_URL}/${lifeInsurance.id}`);

      Router.push(`/nencho/${nenchoId}/insurances`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const showDeleteConfirmDialog = CommonConfirmAlert({
    message: 'この保険情報を削除してもよろしいですか？',
    leftButton: { label: 'キャンセル' },
    rightButton: { label: '削除', labelColor: '#FA3939', clickHandler: handleClickForDelete },
  });

  const goToPreviousPath = () => Router.push(`/nencho/${nenchoId}/insurances`);

  const showGoBackAlertDialog = CommonConfirmAlert({
    message: 'この保険情報を破棄してもよろしいですか？',
    leftButton: {
      label: '破棄',
      labelColor: '#FA3939',
      clickHandler: goToPreviousPath,
    },
    rightButton: { label: '編集を続ける' },
  });

  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* header */}
      <Headroom disableInlineStyles className='page-header page-header-life-insurance'>
        <div style={{ background: '#DEEEFC', position: 'fixed', width: '100%', zIndex: 1 }}>
          <div
            style={{ background: '#FFFFFF', marginTop: '16px', borderRadius: '8px 8px 0px 0px' }}>
            <StyledButton
              style={{
                position: 'absolute',
                top: '38px',
                left: '16px',
                backgroundColor: '#ffffff',
                color: '#525252',
                padding: '0',
                height: '12px',
              }}
              smallSize
              width='65px'
              onClick={formIsChanged ? showGoBackAlertDialog : goToPreviousPath}>
              キャンセル
            </StyledButton>
            <StyledTitle>生命保険</StyledTitle>
            <StyledButton
              name='saveLifeInsurance'
              style={{ position: 'absolute', top: '32px', right: '16px' }}
              important
              smallSize
              width='62px'
              disabled={!formIsChanged}
              onClick={handleClickForUpsert}>
              保存
            </StyledButton>
          </div>
        </div>
        <div style={{ background: '#FFFFFF', width: '100%', height: '80px' }} />
      </Headroom>
      <div style={{ height: '128px' }} />

      {/* form */}
      <div style={{ margin: '0px 16px' }}>
        <SelectBoxWithLabel
          label='加入している生命保険'
          name='category'
          value={lifeInsurance.category.id}
          options={categoryOptions}
          onChange={handleChangeForSelectInsuranceCategory}
          isError={validateState.category.isError}
          errorMessage={validateState.category.errorMessage}
        />

        <InputWithLabel
          label='保険会社等の名称'
          name='firmName'
          value={lifeInsurance.firmName}
          onChange={handleChange}
          isError={validateState.firmName.isError}
          errorMessage={validateState.firmName.errorMessage}
          maxLength={36}
        />

        <InputWithLabel
          label='保険等の種類'
          name='categoryDetail'
          value={lifeInsurance.categoryDetail}
          onChange={handleChange}
          isError={validateState.categoryDetail.isError}
          errorMessage={validateState.categoryDetail.errorMessage}
          maxLength={36}
        />

        <InputWithLabel
          label='保険期間'
          name='period'
          value={lifeInsurance.period}
          onChange={handleChange}
          isError={validateState.period.isError}
          errorMessage={validateState.period.errorMessage}
          maxLength={36}
        />

        <InputWithLabel
          label='保険等の契約者の氏名'
          name='contractorName'
          value={lifeInsurance.contractorName}
          onChange={handleChange}
          isError={validateState.contractorName.isError}
          errorMessage={validateState.contractorName.errorMessage}
          maxLength={36}
        />

        <StyledLabel>保険金等の受取人</StyledLabel>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <InputWithLabel
              label='氏名'
              name='receiverName'
              value={lifeInsurance.receiverName}
              onChange={handleChange}
              isError={validateState.receiverName.isError}
              errorMessage={validateState.receiverName.errorMessage}
              maxLength={36}
            />
          </div>

          <div style={{ width: '50%', marginLeft: '16px' }}>
            <InputWithLabel
              label='あなたとの続柄'
              name='relation'
              value={lifeInsurance.relation}
              onChange={handleChange}
              isError={validateState.relation.isError}
              errorMessage={validateState.relation.errorMessage}
              maxLength={6}
            />
          </div>
        </div>

        <InputYenWithLabel
          label='申請額'
          name='payment'
          value={lifeInsurance.payment.toString().replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g, '$1,')}
          onChange={handleChangePayment}
          isError={validateState.payment.isError}
          errorMessage={validateState.payment.errorMessage}
          maxLength={10}
          type='tel'
        />

        <StyledText style={{ paddingBottom: '32px' }}>
          あなたが本年中に支払った保険料等の金額（分配を受けた剰余金等の控除後の金額）
        </StyledText>

        {isUpdatePage && (
          <StyledButton
            name='deleteLifeInsurance'
            warning
            noShadow
            style={{ width: '100%', marginBottom: '32px' }}
            onClick={showDeleteConfirmDialog}>
            この保険を削除する
          </StyledButton>
        )}
      </div>
      <NotificationError
        isNotification={isNotification}
        setIsNotification={setIsNotification}
        message={errorMessage}
      />
    </div>
  );
};

LifeInsuranceInputs.getInitialProps = async (context: NextPageContext) => {
  const { taskId: nenchoId, lifeInsuranceInputsId } = context.query;

  const isUpdatePage = lifeInsuranceInputsId !== 'new';

  const pageInfo: PageInfo = { currentPageName: '生命保険入力' };
  if (!isUpdatePage) {
    return { isUpdatePage, nenchoId, pageInfo };
  }

  const fetchUrl = apiUrl(context, `${LIFEINSURANCE_API_URL}/${lifeInsuranceInputsId}`);
  try {
    const lifeInsuranceData = (await axios.get(fetchUrl)).data;
    return { ...{ isUpdatePage, nenchoId, pageInfo }, lifeInsuranceData };
  } catch (error) {
    const errorInfo = {
      isError: true,
      message: `${error.message}:${error.response.data.message}`,
    };
    return { isUpdatePage, nenchoId, pageInfo, errorInfo };
  }
};

export default withAuthSync(LifeInsuranceInputs);
