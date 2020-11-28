import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ updateAuthor ] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }
  var authors = props.authors

  const update = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, setBornTo: Number(born) }})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={update}>
          <div>
            name
          <input
              value={name}
              type='text'
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
          <input
              value={born}
              type='number'
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
