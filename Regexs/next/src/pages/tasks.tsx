import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import nextCookie from 'next-cookies';
import dayjs from 'dayjs';
import Layout from '@src/components/layout';
import { withAuthSync } from '@src/util/auth';
import { TaskList } from '@src/components/taskList';

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
  id: string;
  title: string;
  dueDate: string;
  status: string;
}

const fetchTaskList = async (url: string) => {
  const { taskList } = (await axios.get(url)).data;
  return taskList;
};

const tasks: NextPage<TasksProps> = props => {
  // FIXME: error処理 sample
  if (props.error)
    return (
      <p>
        {props.error.status}: {props.error.message}
      </p>
    );

  // FIXME: react-hooks/rules-of-hooksを有効化する方法がないか調査が必要
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: taskList }: { data?: Tasks[] } = useSWR(
    `/api/employees/${props.token}/tasks`,
    fetchTaskList,
    { initialData: props.taskList, refreshInterval: 5000 }
  );

  return (
    <Layout title='タスク一覧' isFooter={false}>
      <div>
        {taskList?.length ? (
          taskList.map(task => {
            return (
              <TaskList
                title={task.title}
                status={task.status}
                dueDate={dayjs(task.dueDate).format('YYYY年MM月DD日')}
                key={task.id}
              />
            );
          })
        ) : (
          <p>タスクがありません。</p>
        )}
      </div>
    </Layout>
  );
};

tasks.getInitialProps = async (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);
  // FIXME: 最終的にはerrorは共通で処理したい。全pageではthrowして共通のerror pageで処理する。
  try {
    const taskList = await fetchTaskList(`http://localhost:3000/api/employees/${token}/tasks`);

    return { taskList };
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

export default withAuthSync(tasks);
