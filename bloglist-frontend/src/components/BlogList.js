import React from 'react';
import { useSelector } from 'react-redux';
import { Link as ReachLink } from 'react-router-dom';

import { Link } from '@chakra-ui/react';

const BlogList = () => {
  const blogs = useSelector(state => state.blogs);
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map(blog => (
        <div key={blog.id} className="blog">
          <Link as={ReachLink} to={`/blogs/${blog.id}`}>
            {blog.title} <i>by</i> {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
