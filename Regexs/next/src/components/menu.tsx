import React from 'react';
import { signout } from '@src/util/auth';
import { StyledMenu } from '@src/styles/menu';

/**
 * burger menu用インターフェース
 *
 * @interface SideMenuProps
 */
interface SideMenuProps {
  open: boolean;
  setOpen: (newValue: boolean) => void;
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
export const MenuComponent: React.FC<SideMenuProps> = props => {
  return (
    <StyledMenu open={props.open}>
      <a href='/' onClick={signout}>
        サインアウト
      </a>
    </StyledMenu>
  );
};
