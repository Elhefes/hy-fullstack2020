const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [{
  id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  __v: 0
}, {
  id: "5a422aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 5,
  __v: 0
}, {
  id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0
}]

const blog = {
  _id: "5a422ba71b54a676234d17fb",
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  likes: 0,
  __v: 0
}

const blogWithoutLikes = {
  _id: "5a422b891b54a676234d17fa",
  title: "First class tests",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  __v: 0
}

const blogWithoutTitleAndUrl = {
  _id: "5a422bc61b54a676234d17fc",
  author: "Robert C. Martin",
  likes: 2,
  __v: 0
}

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('getting blogs from database; ', () => {
  test('they are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all the blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('the identifying field is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })

  })

})

describe('when posting a blog', () => {
  test('blog count increases', async () => {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)
  })

  test('blog without likes has 0 likes', async () => {
    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get(`/api/blogs/${blogWithoutLikes._id}`)
    expect(response.body.likes).toBe(0)
  })

  test('blog without title returns error 400', async () => {
    await api
      .post('/api/blogs')
      .send(blogWithoutTitleAndUrl)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})