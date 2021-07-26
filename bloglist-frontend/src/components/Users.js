import React from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const users = useSelector(state => state.users);

  if (!users) return;
  return (
    <div>
      <h2>Users list</h2>
      <table>
        <thead>
          <tr>
            <th>user name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
