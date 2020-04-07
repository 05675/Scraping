import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import nextCookie from 'next-cookies';
import dayjs from 'dayjs';
import { withAuthSync } from '@src/util/auth';
import { apiUrl } from '@src/util/apiUrl';
import { TaskListItem } from '@src/components/taskList';
import { TaskHeader } from '@src/components/taskHeader';
import * as listCommon from '@src/styles/listCommon';
import { NotificationEmpty } from '@src/components/notificationEmpty';
import { CompleteNotification } from '@src/components/completeNotification';
import { TaskStatus } from '@src/model/entity/tasks';
import { PageInfo } from '@src/interfaces/pageInfo';
import { NotificationError } from '@src/components/notificationerror';
import { ErrorInfo } from '@src/interfaces/errorInfo';

/**
 * タスク一覧画面用インターフェース
 *
 * @interface TasksProps
 */
interface TasksProps {
  taskList?: Tasks[];
  errorInfo?: ErrorInfo;
  token?: string; // withAuth HOCからもらったtoken
}

interface Tasks {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
}

const fetchTaskList = async (url: string) => {
  const { taskList } = (await axios.get(url)).data;
  return taskList;
};

const Tasks: NextPage<TasksProps> = (props) => {
  const { data: taskList }: { data?: Tasks[] } = useSWR(
    `/api/employees/${props.token}/tasks`,
    fetchTaskList,
    { initialData: props.taskList, refreshInterval: 5000 }
  );

  const [isNotification, setIsNotification] = React.useState(false);
  let taskCompleteFlg = false;
  React.useEffect(() => {
    setTimeout(() => setIsNotification(taskCompleteFlg), 1000);
  }, [taskCompleteFlg]);

  const [isErrorNotification, setIsErrorNotification] = React.useState(false);
  const errorMessage = props.errorInfo === undefined ? '' : props.errorInfo.message;
  const errorDisplayFlg = props.errorInfo === undefined ? false : props.errorInfo.isError;
  React.useEffect(() => {
    setTimeout(() => setIsErrorNotification(errorDisplayFlg), 0);
  }, [errorDisplayFlg]);

  const router = useRouter();
  taskCompleteFlg = !!router.query.completeTask;

  return (
    <>
      <TaskHeader />
      <div>
        <listCommon.StyledUl>
          {taskList?.length ? (
            taskList.map((task) => {
              return (
                <div key={task.id} onClick={() => Router.push(`/nencho/${task.id}`)} role='button'>
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
            <NotificationEmpty message='タスクはありません' />
          )}
        </listCommon.StyledUl>
      </div>
      <div style={{ position: 'fixed', bottom: '32px', left: '8px', width: 'calc(100% - 16px)' }}>
        <CompleteNotification
          isNotification={isNotification}
          setIsNotification={setIsNotification}
          // FIXME:nencho画面でタスクタイトルを持てるようになったらメッセージを動的にとるようにする
          message='🎉 2020年分年末調整を提出しました'
        />
      </div>
      <NotificationError
        isNotification={isErrorNotification}
        setIsNotification={setIsErrorNotification}
        message={errorMessage}
      />
    </>
  );
};

Tasks.getInitialProps = async (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);
  const pageInfo: PageInfo = { currentPageName: 'タスク一覧' };

  // FIXME: 最終的にはerrorは共通で処理したい。全pageではthrowして共通のerror pageで処理する。
  try {
    return {
      taskList: await fetchTaskList(apiUrl(ctx, `/api/employees/${token}/tasks`)),
      pageInfo,
    };
  } catch (error) {
    return {
      errorInfo: {
        isError: true,
        message: `${error.message}:${error.response.data.message}`,
      },
    };
  }
};

export default withAuthSync(Tasks);
