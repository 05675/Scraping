import styled from 'styled-components';

export const StyledList = styled.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 0;
  list-style: none;
  border: solid 1px #ebebeb;
  box-sizing: border-box;
`;

export const StyledListNencho = styled.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 16px;
  font-size: 0;
  list-style: none;
  box-sizing: border-box;
  min-height: 100%;
`;

export const StyledListItemTitle = styled.div`
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 180%;
  letter-spacing: 0.06em;
  color: #333333;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  verflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledListItemTitleNencho = styled.div`
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.06em;
  color: #525252;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  //TODO:不要
  //overflow: hidden;
  text-overflow: ellipsis;
`;

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

export const StyledListItemStatus = styled.h5`
  width: 100%;
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 180%;
  letter-spacing: 0.06em;
  margin: 0;
  padding: 0;
`;

export const StyledListItemStatusNencho = styled.h5`
  width: 100%;
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.06em;
  color: #949494;
  margin: 0;
  padding: 0;
`;

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

export const StyledListItemArrow = styled.svg`
  width: 13.41px;
  height: 13.41px;
  margin: 0;
  padding: 0;
`;

export const StyledListBody = styled.body`
  background-color: #edf4fa;
`;
