import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

interface AlertButton {
  label: string;
  labelColor?: string;
  clickHandler?: Function;
}

interface CommonConfirmAlertProps {
  message: string;
  leftButton: AlertButton;
  rightButton: AlertButton;
}
export const CommonConfirmAlert = ({
  message,
  leftButton,
  rightButton,
}: CommonConfirmAlertProps) => () =>
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='react-confirm-alert-body'>
          <p>{message}</p>
          <div className='react-confirm-alert-button-group'>
            <button
              style={{ color: leftButton.labelColor || '#525252' }}
              onClick={() => (leftButton.clickHandler && leftButton.clickHandler()) || onClose()}>
              {leftButton.label}
            </button>
            <button
              style={{ color: rightButton.labelColor || '#525252' }}
              onClick={() => (rightButton.clickHandler && rightButton.clickHandler()) || onClose()}>
              {rightButton.label}
            </button>
          </div>
        </div>
      );
    },
  });
