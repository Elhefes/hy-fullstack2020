import React from 'react'

const BlogForm = ({
   createBlog,
   setTitle,
   setAuthor,
   setUrl,
   title,
   author,
   url
  }) => {
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={createBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={setTitle}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={setAuthor}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={setUrl}
            />
          </div>
          <button type="submit">create</button>
        </form>
        </div>
     )
}

export default BlogForm