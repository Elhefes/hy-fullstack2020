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
  
blogRouter.post('/', async (request, response) => { 
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter;