import React, { useState } from 'react';
import { NextPage } from 'next';
import Layout from '@src/components/layout';
import { StyledLabel, StyledText } from '@src/styles/label';
import SingleSelectComponent from '@src/components/singleSelection';
import { StyledInput } from '@src/styles';
import { withAuthSync } from '@src/util/auth';

type OptionType = {
  label: string;
  value: string;
  groupId?: string;
};

// TODO:リストアイテム仮置き
interface ListItem {
  item: OptionType[];
}

const Form = ({ label }: { label: string }) => {
  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput style={{ margin: '6px auto 16px auto' }} />
    </div>
  );
};

const ListBox = ({ label, items }: { label: string; items: ListItem }) => {
  return (
    <div>
      <StyledLabel> {label} </StyledLabel>
      <SingleSelectComponent options={items.item} onChange={useState} />
    </div>
  );
};

/**
 * 生命保険入力画面
 *
 * @returns {*} Reactコンポーネント
 */
const LifeInsuranceInputs: NextPage = () => {
  const insList: ListItem = {
    item: [],
  };
  // const [insuranceType, setInsuranceTypeList] = useState();
  return (
    <Layout title='生命保険' isHeader isFooter={false}>
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
          <ListBox label='あなたとの続柄' items={insList} />
        </div>
      </div>
      <ListBox label='新・旧の区分' items={insList} />
      <Form label='申告額' />
      <StyledText>
        あなたが本年中に支払った保険料等の金額（分配を受けた剰余金等の控除後の金額）
      </StyledText>
    </Layout>
  );
};

export default withAuthSync(LifeInsuranceInputs);
