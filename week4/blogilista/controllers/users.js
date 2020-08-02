const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  if (body.password === undefined) {
    return response.status(400).json({ error: 'you must define a password' })
  }
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'too short password!' })
  }

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch(exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter