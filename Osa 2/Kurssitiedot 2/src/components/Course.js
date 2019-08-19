import React from 'react'

const Course = ({courses}) => {
    return(
      <div>
        <Header courses={courses} />
      </div>
    )
  }
  
  const Header = ({courses}) => {
    const rows = () => courses.map(course =>
      <div  key={course.id}>
        <h1>
          {course.name}
        </h1>
          <Content parts={course.parts} />
          <Total parts={course.parts} />
      </div> 
      )
      return (
              <div>
                {rows()}
              </div>
      )
  }
  
  const Content = ({parts}) => {
      const rows = () => parts.map(part =>
          <Part
            key={part.id}
            partname={part.name}
            partexercises={part.exercises} />
      )
      return (
        <div>
          {rows()}
        </div>
      )
  }
  
  const Total = ({parts}) => {
      const total = parts.reduce(function(s , p) {
        return s + p.exercises
      }, 0)
    
      return (
          <div>
              <b>Total number of exercises: {total}</b>
          </div>
      )
  
  }
  
  const Part = ({partname, partexercises}) => {
      return (
        <div>
            {partname} {partexercises}
        </div>
      )
  }

  export default Course