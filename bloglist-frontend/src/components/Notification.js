import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (notification === null) return null;
  return (
    <div className={notification.style}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
