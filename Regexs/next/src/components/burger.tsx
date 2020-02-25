import React from 'react';
import { NextPage } from 'next';
import { StyledBurger } from '@src/styles/burger';

/**
 * バーガーボタン用インターフェース
 *
 * @interface BurgerProps
 */
interface BurgerProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOpen: any;
}

/**
 * バーガーボタンのヘッダーコンポーネント
 *
 * @param {BurgerProps} props {
 *     open
 *     setOpen
 * }
 * @returns {*} Reactコンポーネント
 */
const BurgerComponent: NextPage<BurgerProps> = props => {
  return (
    <StyledBurger open={props.open} onClick={() => props.setOpen(!props.open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default BurgerComponent;
