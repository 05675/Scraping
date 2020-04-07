import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import { NenchoListItem } from '@src/components/nenchoListItem';
import { StyledListNencho } from '@src/styles/listCommon';
import { withAuthSync } from '@src/util/auth';
import axios from 'axios';
import { apiUrl } from '@src/util/apiUrl';
import { Nencho } from '@src/model/entity';
import { Loading } from '@src/components/loading';
import { PageInfo } from '@src/interfaces/pageInfo';
import { StyledTitle, NenchoButton } from '@src/styles';
import { nenchoFrameStyle, nenchoMainStyle } from '@src/styles/nenchoStyles';
import { MessageBox } from '@src/components/messageBox';
import { NenchoInsuranceStatus } from '@src/model/entity/nencho/nencho';
import { NotificationError } from '@src/components/notificationerror';
import { ErrorInfo } from '@src/interfaces/errorInfo';
import { CommonConfirmAlert } from '@src/components/commonConfirmAlert';

interface InitialProps {
  taskId: string;
  nenchoInsuranceStatus: number;
  errorInfo?: ErrorInfo;
}

const statusName = ['入力なし', '入力あり', '未提出の情報があります'];

const NenchoMain: NextPage<InitialProps> = props => {
  const [isLoading, setLoadingState] = React.useState<boolean>(false);
  const [isNotification, setIsNotification] = React.useState(false);

  const nenchoIsNotCompleted = props.nenchoInsuranceStatus === NenchoInsuranceStatus.NOT_COMPLETED;
  const nenchoIsNotSubmitted = props.nenchoInsuranceStatus === NenchoInsuranceStatus.NOT_SUBMITTED;

  const errorDisplayFlg = props.errorInfo === undefined ? false : props.errorInfo.isError;
  React.useEffect(() => {
    setTimeout(() => setIsNotification(errorDisplayFlg), 0);
  }, [errorDisplayFlg]);

  const submissionClicked = async (taskId: string) => {
    const showConfirmDialog = CommonConfirmAlert({
      message: '年末調整が提出できませんでした',
      leftButton: { label: 'キャンセル' },
      rightButton: { label: 'リトライ', labelColor: '#3AA0FA', clickHandler: submissionClicked },
    });

    setLoadingState(true);

    // タスク更新API呼出し
    try {
      await axios.put(`/api/nencho/${taskId}/report`);
      // タスク一覧に戻る
      return Router.push(
        {
          pathname: '/tasks',
          query: { completeTask: taskId },
        },
        '/tasks'
      );
    } catch (error) {
      setLoadingState(false);
      showConfirmDialog();
      return 0;
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />

      <div style={nenchoFrameStyle}>
        <header>
          <StyledTitle>2020年分年末調整</StyledTitle>
        </header>
        <main style={nenchoMainStyle}>
          <StyledListNencho>
            {nenchoIsNotSubmitted && (
              <div style={{ marginBottom: '16px' }}>
                <MessageBox>
                  前回提出時より登録情報が変更されました。
                  <br />
                  もう一度提出してください。
                </MessageBox>
              </div>
            )}
            <NenchoListItem
              title='本人情報'
              label='入力あり'
              status={NenchoInsuranceStatus.COMPLETED}
            />
            <NenchoListItem
              title='配偶者情報'
              label='入力あり'
              status={NenchoInsuranceStatus.COMPLETED}
            />
            <NenchoListItem
              title='家族情報'
              label='入力あり'
              status={NenchoInsuranceStatus.COMPLETED}
            />
            <div onClick={() => Router.push(`/nencho/${props.taskId}/insurances`)} role='button'>
              <NenchoListItem
                title='保険料控除'
                label={statusName[props.nenchoInsuranceStatus]}
                status={props.nenchoInsuranceStatus}
              />
            </div>
          </StyledListNencho>
        </main>

        <footer
          style={{
            position: 'fixed',
            width: 'calc(100% - 64px)',
            bottom: '32px',
            margin: '0px 16px',
          }}>
          <NenchoButton
            important
            nenchoStatus={props.nenchoInsuranceStatus}
            onClick={() => submissionClicked(props.taskId)}
            disabled={nenchoIsNotCompleted}>
            提出する
          </NenchoButton>
        </footer>
      </div>
      <NotificationError
        isNotification={isNotification}
        setIsNotification={setIsNotification}
        message={props.errorInfo?.message || ''}
      />
    </>
  );
};

const getNenchoData = async (ctx: NextPageContext, id: string) => {
  const url = apiUrl(ctx, `/api/nencho/${id}`);
  return axios.get(url);
};

NenchoMain.getInitialProps = async ctx => {
  const taskIdFromQuery: string = ctx.query.taskId as string;

  const pageInfo: PageInfo = {
    currentPageName: '2020年分年末調整',
    previousPageName: 'タスク一覧',
    previousPathname: '/tasks',
  };

  const param: InitialProps = {
    taskId: taskIdFromQuery,
    nenchoInsuranceStatus: NenchoInsuranceStatus.NOT_COMPLETED,
  };
  try {
    const { nenchoInsuranceStatus } = (await getNenchoData(ctx, taskIdFromQuery)).data as Nencho;
    param.nenchoInsuranceStatus = nenchoInsuranceStatus;
    return { ...param, pageInfo };
  } catch (error) {
    return {
      taskId: taskIdFromQuery,
      nenchoInsuranceStatus: NenchoInsuranceStatus.NOT_COMPLETED,
      errorInfo: { isError: true, message: `${error.message}:${error.response.data.message}` },
      pageInfo,
    };
  }
};

export default withAuthSync(NenchoMain);
