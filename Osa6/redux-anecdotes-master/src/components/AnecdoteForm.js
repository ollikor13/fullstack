import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.Anecdote.value
    event.target.Anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    props.createAnecdote(newAnecdote)
  }
    return (
      <div>
      <h2>create new</h2>
      <form onSubmit={e => newAnecdote(e)}>
        <div><input name="Anecdote" /></div>
        <button type="submit">create</button>
      </form>
      </div>
    )

}

const ConnectedAnecdoteForm = connect(null, { createAnecdote })(AnecdoteForm)
export default ConnectedAnecdoteForm