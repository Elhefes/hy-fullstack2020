import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  if (!props.show) {
    return null
  }

  const books = props.books
  console.log(books)

  let genres = []

  const bookGenres = books.map(book =>
    book.genres.map(genre => genres.push(genre)))

  const filterByGenre = genre === '' 
    ? books : books.filter(book => book.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>

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
      {genres.map(genre => (
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books