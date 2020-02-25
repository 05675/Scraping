import * as React from 'react';
import { NextPage } from 'next';
import { StyledButton } from '../../styles/button';
import { NenchoList } from '../../components/nenchoList';
import Layout from '../../components/layout';

const nencho: NextPage = () => {
  return (
    <Layout title='2020年年末調整'>
      {/* FIXME:保険料控除と住宅ローンも同じボーダーで一旦設定。
                データの登録状況などに応じて状態をラインを色付け */}
      <NenchoList title='本人情報' status='入力済' />
      <NenchoList title='配偶者情報' status='入力済' />
      <NenchoList title='家族情報' status='入力済' />
      <NenchoList title='保険料控除' status='未入力' />
      <NenchoList title='住宅ローン控除' status='修正してください' />
      <div className='submission-button'>
        <StyledButton important>提出する</StyledButton>
        <style jsx>
          {`
            .submission-button {
              text-align: center;
              margin-top: 23px;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export default nencho;