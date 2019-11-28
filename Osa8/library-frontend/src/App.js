import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommend from './components/Recommend'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { Query, ApolloConsumer, Mutation, useQuery } from 'react-apollo'
import { gql } from 'apollo-boost'
import { useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
`

const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
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
    published,
    genres,
    author{_id}
  }
}
`
const ALL_AUTHORS = gql`
{
  allAuthors  {
    name,
    born,
    numberofBooks
  }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const ME = gql`
{
  me {
    username,
    favoriteGenre
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const { data } = useQuery(ME)


  const client = useApolloClient()

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const errorNotification = () => errorMessage &&
  <div style={{ color: 'red' }}>
    {errorMessage}
  </div>

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      window.alert("Uusi kirja lisättiin:",subscriptionData)
    }
  })
  
  if(token){
    let user = data.me
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>Recommend</button>
          <button onClick={() => logout()}>Logout</button>
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
        <ApolloConsumer>
          {(client) =>
            <Query query={ALL_BOOKS}>
              {(result) =>
                <Recommend show={page === 'recommend'} result={result} client={client} token={token} user={user} />
              }</Query>}
        </ApolloConsumer>
        <Mutation mutation={CREATE_BOOK} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS}]}>
          {(addBook) =>
            <NewBook  show={page === 'add'} addBook={addBook}/>}
        </Mutation>
      </div>
    )
  }
  if(!token){
    if(page === 'loginp'){ // Piti tehdä näin koska jostain syystä loginform renderöityi jokaisella sivulla
      return(
        <div>
          <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('loginp')}>Login</button>
          </div>
          {errorNotification()}
        <Mutation mutation={LOGIN} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS}]}>
          {(login) =>
            <LoginForm show={page === 'loginp'} login={login} setToken={(token) => setToken(token)} />}
        </Mutation>
        </div>
      )
    }
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('loginp')}>Login</button>
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
      </div>
    )

  }
}

export default App