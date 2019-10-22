import React from "react"
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification }  from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  return (
      <div>
        {props.visibleAnecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => clicked(anecdote, props)}>vote</button>
            </div>
          </div>
        ))}
      </div>
  )
}

const clicked = (anecdote, props) => {
  props.vote(anecdote.id, anecdote.content)
  props.setNotification(('You voted: ' + anecdote.content), 5)
}

const anecdotesToShow = ({anecdotes, filters}) => {
  anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filters.filter.toLocaleLowerCase()))
  anecdotes.sort((a, b) => (a.votes < b.votes ? 1 : -1))
  return anecdotes
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
