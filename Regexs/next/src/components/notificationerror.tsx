import React from 'react';
import { StyledCloseSVG } from '@src/styles/svg';

type notificationProps = {
  message: string;
  isNotification: boolean;
  setIsNotification: (newValue: boolean) => void;
};

export const NotificationError: React.FC<notificationProps> = props => {
  if (props.isNotification) setTimeout(() => props.setIsNotification(false), 4000);
  const handleClick = () => props.setIsNotification(!props.isNotification);
  return (
    <>
      <div className='notif-container'>
        <p>{props.message}</p>
        <span className='close-button' onClick={handleClick} role='button'>
          <StyledCloseSVG width='14' height='14' color='#ffffff' />
        </span>
        <style jsx>
          {`
            .notif-container {
              position: fixed;
              width: 100%;
              height: 48px;
              bottom: 0;
              display: flex;
              box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.2);
              border-radius: 8px 8px 0px 0px;
              align-items: center;
              background: red;
              text-align-center;
              transform: ${props.isNotification ? 'translateY(0)' : 'translateY(100%)'};
              opacity: ${props.isNotification ? '1' : '0'};
              pointer-events: ${props.isNotification ? 'auto' : 'none'};
              transition: transform 0.2s ease-in-out, opacity 0.23s ease-in-out;
            }
            .notif-container p {
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 100%;
              letter-spacing: 0.06em;
              color: #ffffff;
              padding-left:16px;
              width: 100%;
            }
            .close-button {
              position: relative;
              padding:0;
              margin-right:13px;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default NotificationError;
