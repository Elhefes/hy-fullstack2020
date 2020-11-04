import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const Blogs = ({ blog }) => {
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
        <Link to={`/blogs/${blog.id}`}><i>{blog.title} {blog.author}</i></Link>
      </div>
    </div>
  )
}

export default Blogs