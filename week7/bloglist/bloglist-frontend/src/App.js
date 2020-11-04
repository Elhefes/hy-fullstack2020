import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
import { TextField } from '@material-ui/core'

import {
  Switch, Route, Link, useParams, useRouteMatch
} from "react-router-dom"
import loginService from './services/login'
import storage from './utils/storage'

import styled from 'styled-components'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { useDispatch, useSelector, connect } from 'react-redux'
import { initializeUsers } from './reducers/userReducer'

const App = (props) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  const users = useSelector(state => state.users)

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
      setUser(user)

      storage.saveUser(user)
      props.setNotification({ message: 'welcome back!', duration: 4 })
    } catch (exception) {
      props.setNotification({ message: 'wrong username/password', duration: 4 })
    }
  }

  const createBlog = async (blog) => {
    try {
      props.createBlog(blog)
      props.setNotification({ message: `a new blog '${blog.title}' by ${blog.author} added!`, duration: 4 })
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const userMatch = useRouteMatch('/users/:id')
  const matchUser = userMatch
    ? users.find((matchUser) => matchUser.id === userMatch.params.id)
    : null

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              label="username"
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (!blogs) {
    return null
  }

  return (
    <div class="container">
      <div>
        <Navigation>
          <Link style={{ padding: 5 }} to="/">blogs</Link>
          <Link style={{ padding: 5 }} to="/users">users</Link>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </Navigation>
      </div>
      <Page>
        <h2>blog app</h2>
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <Blog blog={blog} />
          </Route>
          <Route path="/users/:id">
            <User user={matchUser} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>

            {blogs.sort(byLikes).map(blog =>
              <Blogs
                key={blog.id}
                blog={blog}
              />
            )}
          </Route>
        </Switch>
      </Page>
    </div>
  )
}

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(App)