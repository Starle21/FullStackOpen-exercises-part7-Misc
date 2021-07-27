import React from 'react';
import { useSelector } from 'react-redux';

import { Center } from '@chakra-ui/react';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (notification === null) return null;
  return (
    <Center className={notification.style} p={5}>
      {notification.message}
    </Center>
  );
};

export default Notification;
