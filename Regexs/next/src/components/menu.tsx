import React from 'react';
import { NextPage } from 'next';
import { logout } from '@src/util/auth';
import { StyledMenu } from '@src/styles/menu';

/**
 * burger menu用インターフェース
 *
 * @interface SideMenuProps
 */
interface SideMenuProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOpen: any;
}

/**
 * burger menuヘッダーコンポーネント
 *
 * @param {SideMenuProps} props {
 *     open
 *     setOpen
 * }
 * @returns {*} Reactコンポーネント
 */
const MenuComponent: NextPage<SideMenuProps> = props => {
  return (
    <StyledMenu open={props.open}>
      <a href='/' onClick={logout}>
        ログアウト
      </a>
    </StyledMenu>
  );
};
export default MenuComponent;
