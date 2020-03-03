import React, { useState } from 'react';
import { NextPage } from 'next';
import { StyledLabel, StyledText } from '@src/styles/label';
import { SingleSelectComponent } from '@src/components/singleSelection';
import { StyledInput } from '@src/styles';
import { withAuthSync } from '@src/util/auth';
import { PageHeader } from '@src/components/pageHeader';

type OptionType = {
  label: string;
  value: string;
  groupId?: string;
};

// TODO:リストアイテム仮置き
interface ListItem {
  item: OptionType[];
}

const Form: React.FC<{ label: string }> = ({ label }) => {
  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput style={{ margin: '6px auto 16px auto' }} />
    </>
  );
};

const ListBox: React.FC<{ label: string; items: ListItem }> = ({ label, items }) => {
  return (
    <>
      <StyledLabel> {label} </StyledLabel>
      <SingleSelectComponent options={items.item} onChange={useState} />
    </>
  );
};

/**
 * 生命保険入力画面
 *
 * @returns {*} Reactコンポーネント
 */
const LifeInsuranceInputs: NextPage = () => {
  const saveLifeInsuranceInfo = () => {
    // FIXME: 2020-02-26 K.TANAKA DBへの登録処理をここに実装する
    // eslint-disable-next-line no-alert
    alert('入力内容をDBに登録');
  };

  const insList: ListItem = {
    item: [],
  };
  // const [insuranceType, setInsuranceTypeList] = useState();
  return (
    <>
      <PageHeader title='生命保険' buttonName='保存' buttonFunc={() => saveLifeInsuranceInfo()} />

      <div style={{ margin: '0 16px' }}>
        <ListBox label='生命保険の種類' items={insList} />
        <Form label='保険会社当の名称' />
        <Form label='保険等の種類' />
        <Form label='保険期間' />
        <Form label='保険等の契約者の氏名' />
        <StyledLabel>保険金等の受取人</StyledLabel>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <Form label='氏名' />
          </div>
          <div style={{ width: '50%', marginLeft: '16px' }}>
            <Form label='あなたとの続柄' />
          </div>
        </div>
        <ListBox label='新・旧の区分' items={insList} />
        <Form label='申告額' />
        <StyledText>
          あなたが本年中に支払った保険料等の金額（分配を受けた剰余金等の控除後の金額）
        </StyledText>
      </div>
    </>
  );
};

export default withAuthSync(LifeInsuranceInputs);
