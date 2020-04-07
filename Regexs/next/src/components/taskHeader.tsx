import React from 'react';
import { StyledTitle } from '@src/styles/label';
import Headroom from 'react-headroom';

export const TaskHeader: React.FC = () => {
  return (
    <>
      <Headroom disableInlineStyles className='page-header page-header-task'>
        <StyledTitle style={{ position: 'absolute', top: '16px' }}>タスク一覧</StyledTitle>
      </Headroom>
      <div style={{ height: '120px' }} />
    </>
  );
};

export default TaskHeader;
