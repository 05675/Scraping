import React from 'react';
import { statusToTaskLayout } from '@src/util/statusToTaskLayout';
import { TaskStatus } from '@src/model/entity/tasks';
import * as listCommon from '../styles/listCommon';

interface StyledTaskListProps {
  // TODO: 2020-02-21 K.TANAKA tasksテーブルの定義が決定後にデータの型と扱い方の見直しが必要
  readonly title: string;
  readonly status: TaskStatus;
  readonly dueDate: string;
}

export const TaskListItem: React.FC<StyledTaskListProps> = props => {
  const { statusName, leftColor, icon } = statusToTaskLayout[props.status] || {};
  return (
    <>
      <listCommon.StyledList>
        <div className='tasklist-item-left' />
        <div className='tasklist-item-icon'>{icon}</div>
        <div className='tasklist-item-title'>
          <listCommon.StyledListItemTitle>
            <div className='text-over'>{props.title}</div>
          </listCommon.StyledListItemTitle>{' '}
        </div>{' '}
        <div className='tasklist-item-duedate'>
          <listCommon.StyledListItemDueDate>
            <div className='text-over'>提出期限：{props.dueDate}</div>
          </listCommon.StyledListItemDueDate>
        </div>
        <div className='tasklist-item-status'>
          <listCommon.StyledListItemStatus>
            <div className='text-over'>{statusName}</div>
          </listCommon.StyledListItemStatus>
        </div>{' '}
      </listCommon.StyledList>
      <style jsx>
        {`
          .tasklist-item-left {
            position: absolute;
            width: 8px;
            height: 88px;
            background: ${leftColor};
            border-radius: 8px 0px 0px 8px;
          }
          .tasklist-item-icon {
            position: absolute;
            left: 16px;
            top: 16px;
            width: 24px;
            height: 24px;
            text-align: center;
            vertical-align: middle;
          }
          .tasklist-item-title {
            position: absolute;
            width: calc(100% - 72px - 16px);
            left: 72px;
            top: 16px;
            color: ${Number(props.status) === 2 ? '#b3b3b3' : '#525252'};
          }
          .tasklist-item-duedate {
            position: absolute;
            width: calc(100% - 72px - 16px);
            left: 72px;
            top: 40px;
            color: ${Number(props.status) === 2 ? '#b3b3b3' : '#949494'};
          }
          .tasklist-item-status {
            position: absolute;
            width: calc(100% - 72px - 16px);
            left: 72px;
            bottom: 16px;
            color: ${Number(props.status) === 2 ? '#b3b3b3' : '#525252'};
          }
          .text-over {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>
    </>
  );
};
