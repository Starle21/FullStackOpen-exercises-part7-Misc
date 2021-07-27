import React from 'react';

import {
  Heading,
  Container,
  UnorderedList,
  ListItem,
  Box,
} from '@chakra-ui/react';

// input: props user:{ name, username, id, blogs:[{..},{..}] }
// show name of the user
// list all the blogs added by the user
const User = ({ user }) => {
  return (
    <div>
      <Heading color="teal" w="100%" size="md" align="center" mt={5}>
        {user.name}
      </Heading>
      <Container>
        <Heading color="teal" w="100%" size="sm" align="center" md={5}>
          added blogs:
        </Heading>
        <UnorderedList>
          {user.blogs.map(blog => (
            <ListItem key={blog.id}>
              <Box border="1px" p={2} rounded={5} m={2}>
                {blog.title}
              </Box>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </div>
  );
};

export default User;
