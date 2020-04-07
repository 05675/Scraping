import React from 'react';
import { StyledErrorSVG, StyledCheckSVG } from '@src/styles/svg';
import { StyledListItemTitleNencho, StyledListItemLabelNencho } from '@src/styles/listCommon';
import { NenchoInsuranceStatus } from '@src/model/entity/nencho/nencho';

interface StyledPrimaryListProps {
  readonly title: string;
  readonly label: string;
  readonly status: number;
}

export const statusToIcon: { [key: number]: JSX.Element | null } = {
  [NenchoInsuranceStatus.NOT_COMPLETED]: null,
  [NenchoInsuranceStatus.COMPLETED]: <StyledCheckSVG />,
  [NenchoInsuranceStatus.NOT_SUBMITTED]: <StyledErrorSVG color='#f5a331' />,
};

// FIXME:共通のCSSなどで対応？
export const NenchoListItem: React.FC<StyledPrimaryListProps> = props => {
  return (
    <div>
      <div className='nencholist-item'>
        {/* TODO: iconを返す処理 */}
        <div className='nencholist-item-check'>{statusToIcon[props.status]}</div>

        <div className='nencholist-item-title'>
          <StyledListItemTitleNencho>{props.title}</StyledListItemTitleNencho>
        </div>
        <div className='nencholist-item-label'>
          <StyledListItemLabelNencho>{props.label}</StyledListItemLabelNencho>
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
            box-sizing: border-box;
            cursor: pointer;
            cursor: hand;
          }
          .nencholist-item-check {
            position: absolute;
            top: 16px;
            left: 4px;
          }
          .nencholist-item-title {
            position: absolute;
            top: 16px;
            left: 56px;
          }
          .nencholist-item-label {
            position: absolute;
            bottom: 16px;
            left: 56px;
            text-align: left;
            color: #b3b3b3;
          }
        `}
      </style>
    </div>
  );
};
