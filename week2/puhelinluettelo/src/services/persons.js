import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, updatedPerson) => {
  const req = axios.put(`${baseUrl}/${id}`, updatedPerson)
  return req.then(response=>response.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deletePerson: deletePerson
}