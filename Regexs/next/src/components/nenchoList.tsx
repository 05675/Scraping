import React from 'react';
import { VectorSVG } from '../../assets/images';
import * as listCommon from '../styles/listCommon';

interface StyledPrimaryListProps {
  readonly title: string;
  readonly status: number;
}

const statusColor = ['#FFFFFF', '#FFFFFF', '#FFFFFF'];

const statusName = ['未入力', '入力済み', '修正してください'];

// FIXME:共通のCSSなどで対応？
export const NenchoListItem: React.FC<StyledPrimaryListProps> = props => {
  return (
    <>
      <div className='nencholist-item'>
        <div className='nencholist-item-title'>
          <listCommon.StyledListItemTitleNencho>{props.title}</listCommon.StyledListItemTitleNencho>{' '}
        </div>
        <div className='nencholist-item-status'>
          <listCommon.StyledListItemStatusNencho>
            {statusName[props.status]}
          </listCommon.StyledListItemStatusNencho>
        </div>
      </div>
      <style jsx>
        {`
          .nencholist-item {
            display: inline-block;
            position: relative;
            width: 100%;
            height: 72px;
            background: #ffffff;
            border-bottom: solid 1px #ebebeb;
            //TODO:↓の1行不要
            border-left: solid 0px ${statusColor[props.status]};
            box-sizing: border-box;
          }
          .nencholist-item-title {
            position: absolute;
            top: 16px;
            left: 72px;
          }
          .nencholist-item-status {
            position: absolute;
            bottom: 15px;
            left: 72px;
            text-align: left;
            color: #b3b3b3;
          }
        `}
      </style>
    </>
  );
};
