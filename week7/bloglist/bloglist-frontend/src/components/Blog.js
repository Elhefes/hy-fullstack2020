import React, { useState, useEffect } from 'react'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector, connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"


const Blog = (blog) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  const handleLike = (blog) => {
    console.log(blog)
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      console.log(exception)
    }
  }

  console.log(' ')
  console.log('täs1')
  console.log(blog.blog)
  console.log('täs2')
  console.log(' ')

  const handleRemove = async (id) => {
    removeBlog(id)
  }

  if (!blog.blog) { return null }

  const link = `${blog.blog.url}`

  return (
    <div class = "container">
      <h2>{blog.blog.title} {blog.blog.author}</h2>
      <a target="_blank"
        href={blog.blog.url}>{blog.blog.url}</a>
      <p>{blog.blog.likes} likes
      <button onClick={() => handleLike(blog.blog)}>like</button>
      </p>
      <div>
        added by {blog.blog.user.name}
      </div>
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
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)