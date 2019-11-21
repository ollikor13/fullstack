import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import {  useQuery } from 'react-apollo'

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name,
    _id
  }
}
`

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  let authors = data.allAuthors

  if (!props.show) {
    return null
  }
  
  if(props.result.data !== undefined){
    const books = props.result.data.allBooks
    const genres = books.map(book => book.genres)
    const mergedGenres = [].concat.apply([], genres)
    var uniqueGenres = [];
    uniqueGenres = mergedGenres.filter(function(item, pos) {
      return mergedGenres.indexOf(item) === pos;
    })
  if(!genre){
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
            {books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{authors.find(author => author._id === a.author._id).name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        {uniqueGenres.map(genre => 
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        )}
        <button onClick={() => setGenre(null)}>All genres</button>
      </div>
    )
  }else{
    const filteredBooks = books.filter(book => book.genres.includes(genre))
    return (
      <div>
        <h2>books</h2>
        in genre <b>{genre}</b>
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
            {filteredBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{authors.find(author => author._id === a.author._id).name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        {uniqueGenres.map(genre => 
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        )}
        <button onClick={() => setGenre(null)}>All genres</button>
      </div>
    )
  }
  }else{
    return <div><p>Loading...</p></div>
  }
}

export default Books