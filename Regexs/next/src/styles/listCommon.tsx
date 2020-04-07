import styled from 'styled-components';

export const StyledUl = styled.ul`
  padding: 16px;
  margin: 0;
`;
export const StyledList = styled.li`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 88px;
  margin-bottom: 9px;
  padding: 0;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  cursor: pointer;
  cursor: hand;
`;
export const StyledListItemTitle = styled.span`
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.06em;
  font-weight: normal;
  color: #525252;
  vertical-align: top;
`;
export const StyledListItemStatus = styled.h5`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.06em;
  margin: 0;
`;
export const StyledListItemDueDate = styled.h5`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.06em;
  margin: 0;
`;
export const StyledListItemArrow = styled.svg`
  width: 13.41px;
  height: 13.41px;
  margin: 0;
  padding: 0;
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

export const StyledListItemTitleNencho = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.06em;
  color: #525252;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const StyledListItemLabelNencho = styled.h5`
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.06em;
  color: #949494;
  margin: 0;
  padding: 0;
`;
