import * as React from 'react';
import { NextPage } from 'next';
import { StyledButton } from '@src/styles/button';
import { NenchoList } from '@src/components/nenchoList';
import { Layout } from '@src/components/layout';
import { apiUrl } from '@src/util/apiUrl';
import axios from 'axios';
import { withAuthSync } from '@src/util/auth';

interface TitleProps {
  titleList?: Titles[];
  label: string;
  value: string;
  groupId?: string;
}
interface Titles {
  optionGroup: TitleProps[];
  optionUser: TitleProps[];
  status: number;
  message: string;
}

const nencho: NextPage<Titles> = props => {
  const titleName = ['本人情報', '配偶者情報', '保険料控除', '保険料控除'];
  const statusName = ['入力済', '未入力'];
  console.log('出力：' + props.optionGroup.length);

  for (let i = 0; i < props.optionGroup.length; i++) {
    console.log(i + '回目：' + props.optionGroup[i]);
  }
  //props.optionGroup.length ? (name => {})

  return (
    <Layout title='2020年年末調整'>
      {props.optionGroup.length ? (
        props.optionGroup.map(titles => {
          return <NenchoList title={titles.value} status='入力済' />;
        })
      ) : (
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
      )}
    </Layout>
  );
};

nencho.getInitialProps = async ctx => {
  const response: Titles = {
    optionGroup: [],
    optionUser: [],
    status: 200,
    message: '',
  };
  try {
    const resGroups = await axios.get(apiUrl(ctx, '/api/groups'));
    const resUsers = await axios.get(apiUrl(ctx, '/api/employees'));

    const { groupList } = resGroups.data;
    const { employeeList } = resUsers.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.optionGroup = groupList.map((d: any) => d.value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.optionUser = employeeList.map((d: any) => ({
      value: d.empId,
      label: d.empName,
      groupId: d.groupId,
    }));

    response.status = resGroups.status;
    response.message = resGroups.statusText;

    return response;
  } catch (error) {
    response.status = error.response.status;
    response.message = error.response.data.message ?? error.response.statusText;

    return response;
  }
};

export default withAuthSync(nencho);
