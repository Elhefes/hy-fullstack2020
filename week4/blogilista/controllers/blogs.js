const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.userId)

  const blog = new Blog ({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  })

  if (blog.likes == null) {
    blog.likes = 0
  }

  if (blog.title == null || blog.url == null) {
    response.status(400).end()
  }

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.json(result.toJSON())
})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = new Blog(request.body)
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(result.toJSON())
})


module.exports = blogRouter;