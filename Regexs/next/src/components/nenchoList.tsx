import styled from 'styled-components';
import React from 'react';
import { VectorSVG } from '../../assets/images';

interface StyledPrimaryListProps {
  readonly name?: string;
  readonly created_at?: string;
}

export const StyledList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 0;
  list-style: none;
  border: solid 1px #ebebeb;
`;

export const StyledListItem = styled.li`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 48px;
  background: #ffffff;
  border-left: solid 5px #30b46e;
`;

export const StyledTitle = styled.h4`
  position: absolute;
  left: 15px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 50%;
  letter-spacing: 0.06em;
  color: #333333;
`;

export const StyledStatus = styled.h5`
  position: absolute;
  height: 18px;
  right: 42px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 50%;
  text-align: left;
  color: #b3b3b3;
`;

export const StyledArrow = styled.h5`
  position: absolute;
  top: 15.29px;
  right: 21px;
  margin: 0;
`;

// FIXME:共通のCSSなどで対応？
export const NenchoList: React.FC<StyledPrimaryListProps> = props => {
  return (
    <>
      <StyledList>
        <StyledListItem>
          <StyledTitle>{props.name}</StyledTitle>
          <StyledStatus>{props.created_at}</StyledStatus>
          <StyledArrow>
            <VectorSVG />
          </StyledArrow>
        </StyledListItem>
      </StyledList>
    </>
  );
};
