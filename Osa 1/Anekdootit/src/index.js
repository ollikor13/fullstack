import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const RandomNumb = () => Math.floor(Math.random() * Math.floor(6))

const Most = ({anecdotes, points}) => {
  return (
    <div>
      <h1>Anecdote with most votes:</h1>
      {anecdotes[points.indexOf(Math.max.apply(window,points))]}
      <p>With {points[points.indexOf(Math.max.apply(window,points))]} votes!</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0])

  const handleVote = () => {
    const copy = [...points]
    copy[selected] = copy[selected] + 1
    setPoints(copy)
  }
  
  return (
    <div>
      <h1>Anecdote of the day:</h1>
      {props.anecdotes[selected]}
      <br></br>
      <p>Votes: {points[selected]}</p>
      <br></br>
      <Button handleClick={() => setSelected(RandomNumb())} text="next anecdote" />
      <Button handleClick={() => handleVote(selected, points)} text="Vote"/>
      <Most anecdotes={anecdotes} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)