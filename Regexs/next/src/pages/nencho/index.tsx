import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import nextCookie from 'next-cookies';
import dayjs from 'dayjs';
import { Layout } from '@src/components/layout';
import { withAuthSync } from '@src/util/auth';
import { apiUrl } from '@src/util/apiUrl';
import { NenchoList } from '@src/components/nenchoList';
import { PageHeader } from '@src/components/pageHeader';

/**
 * タスク一覧画面用インターフェース
 *
 * @interface TasksProps
 */
interface TasksProps {
  taskList?: Tasks[];
  error?: { status: string; message: string };
  token?: string; // withAuth HOCからもらったtoken
}

interface Tasks {
  name: string;
  created_at: string;
}

const fetchTaskList = async (url: string) => {
  const { taskList } = (await axios.get(url)).data;
  return taskList;
};

const Tasks: NextPage<TasksProps> = props => {
  const { data: taskList }: { data?: Tasks[] } = useSWR(`/api/groups`, fetchTaskList, {
    initialData: props.taskList,
  });

  return (
    <Layout title='タスク一覧' isFooter={false}>
      <PageHeader title='タスク一覧' />
      <div>
        {taskList?.length ? (
          taskList.map(task => {
            return <NenchoList name={task.name} created_at={task.created_at} />;
          })
        ) : (
          <p>タスクがありません。</p>
        )}
      </div>
    </Layout>
  );
};

Tasks.getInitialProps = async (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);
  // FIXME: 最終的にはerrorは共通で処理したい。全pageではthrowして共通のerror pageで処理する。
  try {
    return { taskList: await fetchTaskList(apiUrl(ctx, `/api/groups`)) };
  } catch (error) {
    const { response } = error;

    return {
      error: {
        status: response.status,
        message: response.data.message ?? response.statusText,
      },
    };
  }
};

export default withAuthSync(Tasks);
