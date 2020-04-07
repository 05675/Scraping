import React from 'react';

type notificationEmptyProps = {
  message: string;
};

export const NotificationEmpty: React.FC<notificationEmptyProps> = props => {
  return (
    <>
      <div className='notif-container'>
        <p>{props.message}</p>
        <style jsx>
          {`
            .notif-container {
              width: 100%;
              height: 88px;
              display: flex;
              position: relative;
              border: 4px dashed #dedede;
              box-sizing: border-box;
              border-radius: 8px;
              justify-content: center;
              align-items: center;
            }
            .notif-container p {
              font-style: normal;
              font-weight: normal;
              font-size: 16px;
              line-height: 100%;
              letter-spacing: 0.06em;
              color: #b3b3b3;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default NotificationEmpty;
