import React from 'react';
import { VectorSVG } from '@assets/images';
import * as listCommon from '../styles/listCommon';

const statusArray = ['未提出', '未提出', '提出済'];

interface StyledTaskListProps {
  // TODO: 2020-02-21 K.TANAKA tasksテーブルの定義が決定後にデータの型と扱い方の見直しが必要
  readonly title: string;
  readonly status: string;
  readonly dueDate: string;
  readonly key: string;
}

export const TaskListItem: React.FC<StyledTaskListProps> = props => {
  return (
    <>
      <li className='tasklist-item'>
        {props.title}
        <div className='tasklist-item-title'>
          <listCommon.StyledListItemTitle>{props.title}</listCommon.StyledListItemTitle>{' '}
          <div className='tasklist-item-newly'>
            <listCommon.StyledListItemNewly>
              {Number(props.status) === 0 ? 'NEW' : ''}
            </listCommon.StyledListItemNewly>
          </div>
        </div>{' '}
        <div className='tasklist-item-status'>
          <listCommon.StyledListItemStatus>
            {statusArray[Number(props.status)]}
          </listCommon.StyledListItemStatus>
        </div>{' '}
        <div className='tasklist-item-duedate'>
          <listCommon.StyledListItemDueDate>
            提出期限：{props.dueDate}
          </listCommon.StyledListItemDueDate>
        </div>
        <div className='tasklist-item-arrow'>
          <listCommon.StyledListItemArrow>
            <VectorSVG />{' '}
          </listCommon.StyledListItemArrow>
        </div>
      </li>
      <style jsx>
        {`
          .tasklist-item {
            display: inline-block;
            position: relative;
            width: 100%;
            height: 96px;
            background: #ffffff;
            border-bottom: solid 1px #ebebeb;
            box-sizing: border-box;
          }
          .tasklist-item-title {
            display: flex;
            align-items: center;
            margin-top: 11px;
            margin-left: 16px;
            max-width: ${Number(props.status) === 0 ? '82%' : '88%'};
          }
          .tasklist-item-newly {
            display: inline-block;
            margin-left: 8px;
          }
          .tasklist-item-status {
            position: absolute;
            top: 56px;
            left: 16px;
            margin: 0;
            padding: 0px 8px;
            text-align: center;
            color: #ffffff;
            background: ${Number(props.status) === 2 ? '#30B46E' : '#797979'};
          }
          .tasklist-item-duedate {
            position: absolute;
            top: 57px;
            left: 77px;
            margin: 0;
          }
          .tasklist-item-arrow {
            position: absolute;
            top: 41.29px;
            right: 21px;
            margin: 0;
          }
        `}
      </style>
    </>
  );
};
