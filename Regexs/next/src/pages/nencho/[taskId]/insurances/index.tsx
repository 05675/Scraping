import { NextPage, NextPageContext } from 'next';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { NenchoListItem } from '@src/components/nenchoListItem';
import { StyledListNencho, StyledTitle, StyledButton } from '@src/styles';
import { apiUrl } from '@src/util/apiUrl';
import axios from 'axios';
import { NotificationEmpty } from '@src/components/notificationEmpty';
import { withAuthSync } from '@src/util/auth';
import { msg } from '@src/util/constantMsg';
import { PageInfo } from '@src/interfaces/pageInfo';
import { InsuranceCategories } from '@src/model/entity';
import { NenchoInsuranceStatus } from '@src/model/entity/nencho/nencho';
import { nenchoFrameStyle, nenchoMainStyle } from '@src/styles/nenchoStyles';
import { NotificationError } from '@src/components/notificationerror';
import { ErrorInfo } from '@src/interfaces/errorInfo';
import { CompleteNotification } from '@src/components/completeNotification';
import { AddInsurancesButton } from '@src/components/addInsurancesbutton';

/**
 * 保険料控除一覧画面用インターフェース
 *
 * @interface TasksProps
 */
interface InsuranceProps {
  insurances?: Insuarances[];
  error?: { status: string; message: string };
  taskId?: string;
  pageInfo?: PageInfo;
  errorInfo?: ErrorInfo;
}

/**
 * 保険料控除用インターフェース
 *
 * @interface Insuarances
 */
interface Insuarances {
  id: string;
  category: InsuranceCategories;
  firmName: string;
}

/**
 * 保険料控除_入力前（従業員）の画面
 *
 * @param {Insuarances} props 画面に表示させる保険料控除の項目
 * @returns {NextPage} 表示させる画面
 */
const Insuarances: NextPage<InsuranceProps> = props => {
  const [isNotification, setIsNotification] = React.useState(false);

  const errorDisplayFlg = props.errorInfo === undefined ? false : props.errorInfo.isError;
  React.useEffect(() => {
    setTimeout(() => setIsNotification(errorDisplayFlg), 0);
  }, [errorDisplayFlg]);

  const [isInsuranceRegistNotif, setIsInsuranceRegistNotif] = React.useState(false);
  let insuranceRegisterFlg = false;
  React.useEffect(() => {
    setTimeout(() => setIsInsuranceRegistNotif(insuranceRegisterFlg), 1000);
  }, [insuranceRegisterFlg]);

  const router = useRouter();
  insuranceRegisterFlg = !!router.query.insuranceRegister;

  return (
    <>
      <div style={nenchoFrameStyle}>
        <header>
          <StyledTitle>保険料控除</StyledTitle>
        </header>

        {/* 保険料一覧 */}
        <main style={nenchoMainStyle}>
          <StyledButton
            style={{ position: 'absolute', top: '16px', right: '16px' }}
            important
            smallSize
            width='57px'
            disabled={props.insurances?.length === 0}
            onClick={() => Router.push(`/nencho/${props.taskId}`)}>
            完了
          </StyledButton>
          <StyledListNencho>
            {props.insurances?.length ? (
              // リストの左端にチェックマークを常に表示するため、NenchoListItemのisCheckedプロパティにtrueを常に渡す
              props.insurances.map(insurance => (
                <div
                  key={insurance.id}
                  onClick={() =>
                    Router.push(`/nencho/${props.taskId}/lifeInsuranceInputs/${insurance.id}`)
                  }
                  role='button'>
                  <NenchoListItem
                    title={insurance.category.name}
                    label={insurance.firmName}
                    status={NenchoInsuranceStatus.COMPLETED}
                  />
                </div>
              ))
            ) : (
              <NotificationEmpty message={msg.NO_REGISTRATION} />
            )}
          </StyledListNencho>
        </main>

        {/* 新しい保険追加ボタン */}
        <footer
          style={{
            position: 'fixed',
            width: 'calc(100% - 64px)',
            bottom: '32px',
            margin: '0px 16px',
          }}>
          <AddInsurancesButton
            primary
            onClick={() => Router.push(`/nencho/${props.taskId}/lifeInsuranceInputs/new`)}>
            新しい保険を追加する
          </AddInsurancesButton>
        </footer>

        <NotificationError
          isNotification={isNotification}
          setIsNotification={setIsNotification}
          message={props.errorInfo ? props.errorInfo.message : ''}
        />
      </div>

      {/* message 表示 */}
      <div
        style={{
          position: 'fixed',
          bottom: '112px',
          left: '8px',
          width: 'calc(100% - 16px)',
          pointerEvents: isInsuranceRegistNotif ? 'auto' : 'none',
        }}>
        <CompleteNotification
          isNotification={isInsuranceRegistNotif}
          setIsNotification={setIsInsuranceRegistNotif}
          message={msg.SAVED_INSURANCE_INFO}
        />
      </div>
    </>
  );
};

Insuarances.getInitialProps = async (ctx: NextPageContext): Promise<InsuranceProps> => {
  try {
    const { taskId } = ctx.query;
    const pageInfo: PageInfo = { currentPageName: '保険料控除' };

    const { insurances } = (await axios.get(apiUrl(ctx, `/api/insurances/${taskId}`))).data;

    return {
      insurances,
      taskId: taskId as string,
      pageInfo,
    };
  } catch (error) {
    const { response } = error;

    return {
      errorInfo: {
        isError: true,
        message: response.data.message ?? response.statusText,
      },
    };
  }
};

export default withAuthSync(Insuarances);
