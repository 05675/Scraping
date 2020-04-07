import React from 'react';

type notificationProps = {
  message: string;
  isNotification: boolean;
  setIsNotification: (newValue: boolean) => void;
};

export const CompleteNotification: React.FC<notificationProps> = (props) => {
  if (props.isNotification) setTimeout(() => props.setIsNotification(false), 4000);
  const handleClick = () => props.setIsNotification(!props.isNotification);
  return (
    <>
      <div className='notif-container' onClick={handleClick} role='button'>
        <p>{props.message}</p>
        <style jsx>
          {`
            .notif-container {
              width: 100%;
              height: 48px;
              display: flex;
              border-radius: 8px;
              align-items: center;
              background: #525252;
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
              padding-left: 8px;
              width: 100%;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default CompleteNotification;
