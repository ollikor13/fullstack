import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: getId(),
    votes: 0
  }
}
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdote = state.find( ({id}) => id === action.id)
      anecdote.votes = anecdote.votes + 1
      return [ ...state ]
    case 'NEW':
      const obj = asObject(action.content)
      state = state.concat(obj)
      return state
    case 'INIT':
      return action.content
    default:
      return state
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      content: anecdotes,
    })
  }
}
export const vote = (id, content) => {
  return async dispatch => {
    const allAnecdotes = await anecdoteService.getAll()
    const changedAnecdote = allAnecdotes.find(anecdote => id === anecdote.id)
    changedAnecdote.votes = changedAnecdote.votes + 1
    const newObject = changedAnecdote
    const votedAnecdote = await anecdoteService.voteAnecdote(id, newObject)
    dispatch({
      type: 'VOTE',
      id: votedAnecdote.id,
      content
    })
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      content: newAnecdote.content,
    })
  }
}

export default anecdoteReducer