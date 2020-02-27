import styled, { StyledComponent } from 'styled-components';
import React, { ReactElement } from 'react';

/**
 * リストのアイテムに格納するプロパティのインターフェース
 *
 * @interface InsuaranceItemProps
 */
interface InsuaranceItemProps {
  kind: string;
  firm: string;
  key: number;
}

/**
 * リストのプロパティのインターフェース
 *
 * @interface InsuarancesListProps
 */
export interface InsuarancesListProps {
  listItems: InsuaranceItemProps[];
}

/**
 * リスト全体のコントロール
 *
 * @param {InsuarancesListProps} props リストアイテムの配列
 * @returns {ReactElement} 表示する保険のリスト
 */
export const InsuaranceList: React.FC<InsuarancesListProps> = props => {
  return (
    <>
      {props.listItems.map(insuarance => {
        return (
          <InsuaranceListItem kind={insuarance.kind} firm={insuarance.firm} key={insuarance.key} />
        );
      })}
    </>
  );
};

/**
 * リストの1つ1つのアイテム
 *
 * @param {InsuaranceItemProps} props 保険会社名と保険種別
 * @returns {ReactElement} 表示するリストのアイテム
 */
const InsuaranceListItem: React.FC<InsuaranceItemProps> = props => {
  return (
    <StyledInsuaranceListItem>
      <StyledNameFirmWrapper theme={{ size: 11 }}>
        <div>{props.kind}</div>
        <StyledFirmName>{props.firm}</StyledFirmName>
      </StyledNameFirmWrapper>
      <StyledArrowWrapper theme={{ size: 1 }}>→</StyledArrowWrapper>
    </StyledInsuaranceListItem>
  );
};

/**
 *リストの中のアイテム全体のデザイン
 *
 * @returns {StyledComponent} コントロール
 */
const StyledInsuaranceListItem = styled.div`
  display: flex;
  border: solid #ebebeb;
  border-width: 1px 0px 1px 0px;
  padding: 10px 16px 9px 16px;
`;

/**
 * 保険会社名を包含するコントロールのデザイン
 *
 * @returns {StyledComponent} コントロール
 */
const StyledNameFirmWrapper = styled.div`
  flex: ${({ theme }) => theme.size};
`;

/**
 * 保険種別を包含するコントロールのデザイン
 *
 * @returns {StyledComponent} コントロール
 */
const StyledFirmName = styled.div`
  font-size: 12px;
  color: #797979;
  margin-top: 18px;
`;

/**
 * 矢印を包含するコントロールのデザイン
 *
 * @returns {StyledComponent} コントロール
 */
const StyledArrowWrapper = styled(StyledNameFirmWrapper)`
  flex: ${({ theme }) => theme.size};
  display: flex;
  justify-content: center;
  align-items: center;
`;
