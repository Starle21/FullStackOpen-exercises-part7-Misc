import React from 'react';
import { useSelector } from 'react-redux';
import { Link as ReachLink } from 'react-router-dom';

import {
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
} from '@chakra-ui/react';

// input: users: [ {..}, {..} ]
// shows list of users - links to a single user
const Users = () => {
  const users = useSelector(state => state.users);

  return (
    <div>
      <Heading align="center" size="lg">
        Users list
      </Heading>
      <Container mt={10}>
        <Table>
          <Thead>
            <Tr>
              <Th>user name</Th>
              <Th>blogs created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user => {
              return (
                <Tr key={user.id}>
                  <Td>
                    <Link as={ReachLink} to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                  </Td>
                  <Td>{user.blogs.length}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Users;
