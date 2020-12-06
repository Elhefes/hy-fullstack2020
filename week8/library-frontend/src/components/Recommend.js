import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ME } from './../queries'

const Recommend = (props) => {
  const [currentUser, setCurrentUser] = useState(null)
  const userResponse = useQuery(ME)

  useEffect(() => {
    setCurrentUser(userResponse.data ? userResponse.data.me : null)
  })

  if (userResponse.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = props.books
  const filterByGenre = currentUser === null 
    ? null : books.filter(book => book.genres.includes(currentUser.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        <p>
          books in your favorite genre <b>{ currentUser.favoriteGenre }</b>
        </p>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filterByGenre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend