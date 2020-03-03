import * as React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { StyledButton } from '@src/styles/button';
import { NenchoListItem } from '@src/components/nenchoList';
import { PageHeader } from '@src/components/pageHeader';
import * as listCommon from '@src/styles/listCommon';
import { withAuthSync } from '@src/util/auth';

const Nencho: NextPage = () => {
  const statusNum: { [key: string]: number } = {
    EMPTY: 0,
    FINISHED: 1,
    TBC: 2,
  };

  // FIXME: 実データに入れ替えてください。
  const nenchoList = [
    { id: 'uuid1', title: '本人情報', status: statusNum.FINISHED },
    { id: 'uuid2', title: '配偶者情報', status: statusNum.FINISHED },
    { id: 'uuid3', title: '家族情報', status: statusNum.FINISHED },
    { id: 'uuid4', title: '保険料控除', status: statusNum.EMPTY },
    { id: 'uuid5', title: '住宅ローン控除', status: statusNum.TBC },
  ];

  return (
    <>
      <PageHeader title='2020年分年末調整' />
      <listCommon.StyledListBody>
        <listCommon.StyledListBody2>
          <div className='page-background'>
            <listCommon.StyledListNencho>
              {nenchoList.map(nencho => (
                <p key={nencho.id} onClick={() => Router.push('/nencho/insurances')} role='button'>
                  <NenchoListItem title={nencho.title} status={nencho.status} />
                </p>
              ))}
            </listCommon.StyledListNencho>
            <p className='submission-button'>
              <StyledButton important onClick={() => Router.push('/tasks')}>
                提出する
              </StyledButton>

              <style jsx>
                {`
                  .submission-button {
                    text-align: center;
                    padding-top: 37px;
                    padding-bottom: 16px;

                    bottom: 20px;
                    position: fixed;
                    margin: 0 16px;
                    bottom: 20px;
                  }
                  .page-background {
                    background: #ffffff;
                    border-radius: 0 0 8px 8px;
                  }
                `}
              </style>
            </p>
          </div>
        </listCommon.StyledListBody2>
      </listCommon.StyledListBody>
    </>
  );
};

export default withAuthSync(Nencho);
