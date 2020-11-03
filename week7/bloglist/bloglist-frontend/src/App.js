import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'
import {initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import {  useDispatch, useSelector, connect } from 'react-redux'

const App = (props) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs.sort((a,b)=>b.likes-a.likes))

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
      props.setNotification({message: 'welcome back!', duration: 4})
    } catch(exception) {
      props.setNotification({message: 'wrong username/password', duration: 4})
    }
  }

  const createBlog = async (blog) => {
    try {
      props.createBlog(blog)
      props.setNotification({message: `a new blog '${blog.title}' by ${blog.author} added!`, duration: 4})
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = (id) => {
    try {
      const blogToLike = blogs.find(b => b.id === id)
      props.likeBlog(blogToLike)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = async (id) => {
    props.removeBlog(id)
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

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