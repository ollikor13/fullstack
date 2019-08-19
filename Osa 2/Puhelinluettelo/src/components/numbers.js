import React from 'react'
import numberService from './services/numbers'

const Numbers = ({namesToShow, persons, setErrorMessage, setErrorType}) => {

  const deleteNumb = (personname, id) => {
    const result = window.confirm("Do you really want to delete " + personname + "'s this number?")

    if(id !== undefined && result === true){
      numberService
      .dele(id)
      setErrorType(false)
      setErrorMessage(personname + " was deleted succesfully!")
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
  }
    const rows = () => namesToShow.map(person =>
      <p key={person.name}>
        {person.name}{' '}{person.number} <button type="button" onClick={() => deleteNumb(person.name, person.id, persons)}>Delete</button>
      </p>
  )
  
    return(
      <div>
        {rows()}
      </div>
    )
  }

export default Numbers