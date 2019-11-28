import React from 'react'
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
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  let authors = data.allAuthors
  

  if (!props.show) {
    return null
  }
  
  if(props.result.data !== undefined){
    const books = props.result.data.allBooks
  
    const filteredBooks = books.filter(book => book.genres.includes(props.user.favoriteGenre))
    return (
      <div>
        <h2>Recommended books</h2>
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
      </div>
    )
  }
}

export default Books