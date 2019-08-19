import React, { useState, useEffect } from 'react'
import Numbers from './numbers'
import Add from './add'
import Filter from './filter'
import numberService from './services/numbers'
import Notification from './notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState(true)

  useEffect(() => {
    numberService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
      })
  }, [])
  
  const [ newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const namesToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))
  
  return (
    <div>
      <Notification message={errorMessage} errorType={errorType}/>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} setShowAll={setShowAll} />
      <h2>Add a new</h2>
      <Add persons={persons} setPersons={setPersons} errorMessage={errorMessage} setErrorMessage={setErrorMessage} setErrorType={setErrorType} />
      <h2>Numbers</h2>
      <Numbers namesToShow={namesToShow} persons={persons} setPersons={setPersons} errorMessage={errorMessage} setErrorMessage={setErrorMessage} setErrorType={setErrorType} />
    </div>
  )

}

export default App