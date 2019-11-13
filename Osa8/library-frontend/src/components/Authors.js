import React from 'react'
import EditAuthor from './EditAuthor'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

const UPDATE_AUTHOR = gql`
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
const ALL_AUTHORS = gql`
{
  allAuthors  {
    name,
    born,
    bookCount
  }
}
`

const Authors = (props) => {
  if (!props.show && props.show !== undefined) {
    return null
  }

  if(props.result.data !== undefined){
    const authors = props.result.data.allAuthors
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
        <Mutation mutation={UPDATE_AUTHOR} refetchQueries={[{ query: ALL_AUTHORS}]}>
        {(editAuthor) =>
          <EditAuthor editAuthor={editAuthor} authors={authors}/>}
      </Mutation>
      </div>
    )
  }else{
    return <div><p>Loading...</p></div>
  }

}

export default Authors