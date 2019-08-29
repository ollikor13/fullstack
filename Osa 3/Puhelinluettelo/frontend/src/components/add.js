import React, { useState } from 'react'
import numberService from './services/numbers'

const Add = ({persons, setPersons, setErrorMessage, setErrorType}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
  
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
  
    const addName = (event) => {
      const found = persons.some(el => el.name === newName)

      if(found){
        event.preventDefault()
        const id = persons.find(person => person.name === newName).id
        const person = persons[id-1]
        const changedPerson = { ...person, number: newNumber }
        const result = window.confirm(newName + ' is already added to phonebook. Do you want to replace it?')
        if(result === true){
          numberService
          .update(id, changedPerson)
          .then(returnedNumber => {
          setPersons(persons.map(person => person.id !== id ? person : returnedNumber))
          setErrorType(false)
          setErrorMessage(newName + " was changed succesfully!")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          })
          .catch(error => {
            setErrorType(true)
            setErrorMessage(newName + ' was already deleted from the server')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
        }
      }else{
        event.preventDefault()
        const nameObject = {
          name: newName,
          number: newNumber,
        }
        numberService
          .create(nameObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorType(false)
          setErrorMessage(newName + " was added succesfully!")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
          })
          .catch(error => {
          setErrorType(true)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          })
      }
    }
  
    return(
      <div>
      <form onSubmit={addName}>
        <div> name: <input value={newName} onChange={handleNameChange} /> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} /> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
    )
  }


  /*          .catch(error => {
            setErrorMessage(newName + ' was already deleted from the server')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })*/

export default Add