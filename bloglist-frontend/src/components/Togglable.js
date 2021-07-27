import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@chakra-ui/react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideAux = { display: visible ? 'none' : '' };
  const showMain = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideAux}>
        <Button onClick={toggleVisibility} colorScheme="teal" w="100%">
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showMain}>
        {props.children}
        <Button onClick={toggleVisibility} colorScheme="gray" w="100%">
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
