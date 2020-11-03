import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'CREATE':
            return [...state, action.data]
        case 'INIT':
            return action.data
        default:
            return state
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const createdBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE',
            blog: createdBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            blogs: blogs
        })
    }
}

export default blogReducer