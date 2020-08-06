import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const infoHidden = { display: visible ? 'none' : '' }
  const infoVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const displayDelete = {
    display: user.name === blog.user.name ? '' : 'none'
  }

  return (
    <div style={blogStyle}>
      <div style={infoHidden}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={infoVisible}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={likeBlog}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={displayDelete}>
          <button
            onClick={() => removeBlog(blog)}>
            delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
