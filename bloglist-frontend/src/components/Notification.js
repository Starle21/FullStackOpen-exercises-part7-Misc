import React from 'react';

const Notification = ({ notification }) => {
  if (notification === null) return null;
  return (
    <div className={notification.style}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
