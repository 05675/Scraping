import { CSSProperties } from 'react';

export const nenchoFrameStyle: CSSProperties = {
  position: 'fixed',
  height: 'calc(100% - 80px)',
  width: 'calc(100% - 32px)',
  top: '64px',
  left: '16px',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  borderRadius: '8px 8px 8px 8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
};

export const nenchoMainStyle: CSSProperties = {
  height: 'calc(100% - 80px)',
  overflowY: 'auto',
  marginTop: '8px',
};
