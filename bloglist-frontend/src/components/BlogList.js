import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector(state => state.blogs);
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map(blog => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
