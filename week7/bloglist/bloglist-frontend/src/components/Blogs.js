import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"


const Blogs = ({ blog, handleLike, handleRemove, own }) => {
  if (!blog) {
    return null
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
      <div>
        <Link to={`/blogs/${blog.id}`}><i>{blog.title}</i></Link>
      </div>
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
        </div>
        {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
    </div>
  )
}

Blogs.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blogs