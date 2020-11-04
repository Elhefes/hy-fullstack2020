import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'CREATE':
            return [...state, action.data]
        case 'INIT':
            return action.data
        case 'LIKE':
            return state.map(blog =>
                blog.id !== action.data.id ? blog : action.data)
        case 'REMOVE':
            return state.filter(blog => blog.id !== action.data)
        default:
            return state
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const createdBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE',
            data: createdBlog
        })
    }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(blog.id, likedBlog)
    dispatch({
      type: 'LIKE',
      data: data
    })
  }
}

export const removeBlog = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE',
            data: id
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export default blogReducer