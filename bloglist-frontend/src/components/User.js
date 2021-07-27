import React from 'react';

// input: props user:{ name, username, id, blogs:[{..},{..}] }
// show name of the user
// list all the blogs added by the user
const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs:</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
