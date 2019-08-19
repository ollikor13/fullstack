import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <div>
            <Part partname={props.parts[0].name} partexercises={props.parts[0].exercises} />
            <Part partname={props.parts[1].name} partexercises={props.parts[1].exercises} />
            <Part partname={props.parts[2].name} partexercises={props.parts[2].exercises} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {sum(props.parts[0].exercises,props.parts[1].exercises,props.parts[2].exercises)}</p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.partname} {props.partexercises}</p>
        </div>
    )
}

const sum = (p1, p2, p3) => {
    return p1 + p2 + p3
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
    console.log(course)

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))