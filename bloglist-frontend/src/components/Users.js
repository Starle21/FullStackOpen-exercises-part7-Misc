import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// input: users: [ {..}, {..} ]
// shows list of users - links to a single user
const Users = () => {
  const users = useSelector(state => state.users);

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
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
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
