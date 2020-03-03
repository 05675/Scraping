import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import nextCookie from 'next-cookies';
import dayjs from 'dayjs';
import { withAuthSync } from '@src/util/auth';
import { apiUrl } from '@src/util/apiUrl';
import { TaskListItem } from '@src/components/taskList';
import { PageHeader } from '@src/components/pageHeader';
import * as listCommon from '@src/styles/listCommon';

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

const Tasks: NextPage<TasksProps> = props => {
  const { data: taskList }: { data?: Tasks[] } = useSWR(
    `/api/employees/${props.token}/tasks`,
    fetchTaskList,
    { initialData: props.taskList, refreshInterval: 5000 }
  );

  return (
    <>
      <PageHeader title='タスク一覧' />
      <div>
        <listCommon.StyledList>
          {taskList?.length ? (
            taskList.map(task => {
              return (
                <div key={task.id} onClick={() => Router.push('/nencho')} role='button'>
                  <TaskListItem
                    title={task.title}
                    status={task.status}
                    dueDate={dayjs(task.dueDate).format('YYYY年MM月DD日')}
                    key={task.id}
                  />
                </div>
              );
            })
          ) : (
            <p />
          )}
        </listCommon.StyledList>
      </div>
    </>
  );
};

Tasks.getInitialProps = async (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);
  // FIXME: 最終的にはerrorは共通で処理したい。全pageではthrowして共通のerror pageで処理する。
  try {
    return { taskList: await fetchTaskList(apiUrl(ctx, `/api/employees/${token}/tasks`)) };
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
