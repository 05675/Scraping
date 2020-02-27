import { NextPage } from 'next';
import React from 'react';
import { Layout } from '@src/components/layout';
import { StyledButton } from '@src/styles/button';
import { InsuaranceList, InsuarancesListProps } from '@src/styles/insuaranceList';
import { PageHeader } from '@src/components/pageHeader';

/**
 * 保険料控除_入力前（従業員）の画面
 *
 * @param {InsuarancesListProps} props 画面に表示させる保険料控除の項目
 * @returns {NextPage} 表示させる画面
 */
const Insuarances: NextPage<InsuarancesListProps> = (props: InsuarancesListProps) => {
  return (
    <Layout title='保険料控除' isHeader isFooter={false}>
      <PageHeader title='保険料控除' />
      <InsuaranceList {...props} />
      <div>
        <StyledButton important>+{'　'}新しい保険を追加する</StyledButton>
      </div>
      <style jsx>
        {`
          div {
            bottom: 20px;
            width: 99%;
            position: fixed;
            text-align: center;
          }
        `}
      </style>
    </Layout>
  );
};

Insuarances.getInitialProps = () => {
  // 特に、DBなどから情報を持ってくる予定はないため、直接ここに表示させる保険について記載する
  const result: InsuarancesListProps = {
    listItems: [{ kind: '生命保険（一般）', firm: '弥生生命', key: 1 }],
  };
  return result;
};

export default Insuarances;
