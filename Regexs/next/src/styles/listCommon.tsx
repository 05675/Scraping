import styled from 'styled-components';

// 全体のライン。中のライン
export const StyledList = styled.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 0;
  list-style: none;
  border: solid 1px #ebebeb;
  box-sizing: border-box;
`;
//件名
export const StyledListItemTitle = styled.span`
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 180%;
  letter-spacing: 0.06em;
  color: #333333;
  margin: 0;
  padding: 0;
`;

//newのロゴ
export const StyledListItemNewly = styled.span`
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.06em;
  color: #0f84ec;
  margin: 0;
  padding: 0;
`;

//未提出の部分
export const StyledListItemStatus = styled.h5`
  width: 54px;
  height: 20px;
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 180%;
  letter-spacing: 0.06em;
  color: #ffffff;
  margin: 0;
  padding: 0;
`;

//提出年月日
export const StyledListItemDueDate = styled.h5`
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.06em;
  color: #333333;
  margin: 0;
  padding: 0;
`;

//画像ファイル
export const StyledListItemArrow = styled.svg`
  width: 13.41px;
  height: 13.41px;
  margin: 0;
  padding: 0;
`;
