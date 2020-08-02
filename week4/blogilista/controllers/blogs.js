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

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter;