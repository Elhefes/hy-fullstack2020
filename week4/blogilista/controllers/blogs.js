const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.likes == null) {
    blog.likes = 0
  }

  if (blog.title == null || blog.url == null) {
    response.status(400).end()
  }

  const result = await blog.save()
  response.status(201).json(result)
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