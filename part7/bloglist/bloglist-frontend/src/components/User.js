import React, { useState, useEffect } from 'react'

const User = (user) => {
  if (!user.user) {
    return null
  }

  return (
    <div class = "container">
      <h2>{user.user.name}</h2>
      <b>added blogs</b>

      {user.user.blogs.map(blog =>
        <tr key={blog.id}>
          <td>
            <li>
              {blog.title}
            </li>
          </td>
        </tr>
      )}
    </div>
  )
}

export default User