import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const update = async (id, newBlog) => {
  console.log('1')
  console.log(newBlog)
  console.log('2')
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, getConfig());
  return response.data;
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }