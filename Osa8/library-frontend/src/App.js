import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    id
    published
    genres
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks  {
    title,
    author,
    published
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

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <ApolloConsumer>
        {(client) =>
          <Query query={ALL_AUTHORS}>
            {(result) =>
              <Authors show={page === 'authors'} result={result} client={client}/>
            }</Query>}
      </ApolloConsumer>
      <ApolloConsumer>
        {(client) =>
          <Query query={ALL_BOOKS}>
            {(result) =>
              <Books show={page === 'books'} result={result} client={client}/>
            }</Query>}
      </ApolloConsumer>
      <Mutation mutation={CREATE_BOOK} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS}]}>
        {(addBook) =>
          <NewBook  show={page === 'add'} addBook={addBook}/>}
      </Mutation>
    </div>
  )
}

export default App