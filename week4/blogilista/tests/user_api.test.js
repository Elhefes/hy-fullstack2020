const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

const userWithTooShortPassword = {
  username: "HarryPotter",
  password: "HP",
  name: "Harry Potter"
}

beforeEach(async () => {
  await User.deleteMany({})
})

describe('when creating a user', () => {
  test('with too short password it returns error 400', async () => {
    await api
      .post('/api/users')
      .send(userWithTooShortPassword)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})