import React, { ReactElement } from 'react';
import { StyledNotificationsSVG, StyledCheckBadgeSVG, StyledErrorSVG } from '@src/styles/svg';
import { TaskStatus } from '@src/model/entity/tasks';

type TaskLayout = {
  [status in TaskStatus]: {
    statusName: string;
    leftColor: string;
    icon: ReactElement;
  };
};

export const statusToTaskLayout: TaskLayout = {
  [TaskStatus.NEW]: {
    statusName: '提出前',
    leftColor: '#b8ddfd',
    icon: <StyledNotificationsSVG color='#3aa0fa' />,
  },
  [TaskStatus.DONE]: {
    statusName: '完了',
    leftColor: '#eaf8b6',
    icon: <StyledCheckBadgeSVG color='#afd231' />,
  },
  [TaskStatus.NOT_SUBMITTED]: {
    statusName: '未提出の情報があります',
    leftColor: '#fcddb1',
    icon: <StyledErrorSVG color='#f5a331' />,
  },
};
