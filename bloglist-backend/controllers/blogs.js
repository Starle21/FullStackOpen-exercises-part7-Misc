const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const userExtractor = require('../utils/middleware').userExtractor;

// // CHAINING PROMISES
// blogsRouter.get("/", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// ASYNC AWAIT
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { name: 1, username: 1 })
    .populate('comments', { content: 1 });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

// not updated to include token authorization
blogsRouter.put('/:id', async (request, response) => {
  // version 1
  const body = request.body;
  const contentToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    contentToUpdate,
    {
      runValidators: true,
      new: true,
    }
  )
    .populate('user', { name: 1, username: 1 })
    .populate('comments', { content: 1 });
  console.log('after', body);
  return response.json(updatedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  //token from request request.token
  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(400).json({
      error: 'blog has been already deleted',
    });
  }

  if (!(user.id === blog.user.toString())) {
    return response.status(401).json({
      error:
        'Only the creator of the blog info can delete it. You are not the creator.',
    });
  }

  await blog.remove();
  response.status(204).end();
});

blogsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({}).populate('blog', { title: 1 });
  response.json(comments);
});
blogsRouter.post('/:id/comments', async (request, response) => {
  //
  const body = request.body;
  const id = request.params.id;

  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(400).json({
      error: "blog doesn't exist",
    });
  }

  const newComment = new Comment({
    content: body.content,
    blog: blog._id,
  });

  const savedComment = await newComment.save();

  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = blogsRouter;
