import React, { useState, useEffect } from 'react'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector, connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"


const Blog = ({ blog, own }) => {
    const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  if (!blog) {
    return null
  }

  const handleLike = (id) => {
    try {
      const blogToLike = blogs.find(b => b.id === id)
      likeBlog(blogToLike)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = async (id) => {
    removeBlog(id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      wup
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
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