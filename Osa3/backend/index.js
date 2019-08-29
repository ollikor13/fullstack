const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const Person = require('./models/person')
const cors = require('cors')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

app.get('/info', (request, response) => {
  //Info

  Person.find({}).then(persons => {
    const amount = persons.length
    response.send(
      '<h1>Phonebook currently has ' + amount + ' numbers/persons</h1>'
    )
  })
})

app.post('/api/persons', (request, response, next) => {
  //Post
  response.header('Access-Control-Allow-Origin', '*')
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'Name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  console.log('Attempting to post: ', person)
  if (person.name !== null && person.number !== null) {
    person
      .save()
      .then(savedPerson => {
        response.json(savedPerson.toJSON())
      })
      .catch(error => next(error))
  } else {
    console.log('Posting failed', person)
  }
})

app.get('/api/persons', (request, response) => {
  //Hae kaikki
  response.header('Access-Control-Allow-Origin', '*')
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  //Hae tietty
  response.header('Access-Control-Allow-Origin', '*')
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  //Delete
  Person.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    // eslint-disable-next-line no-undef
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  //Muokkaa
  const body = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        const person1 = {
          name: person.toJSON().name,
          number: body.number
        }
        Person.findByIdAndUpdate(request.params.id, person1, { new: true })
          .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
          })
          .catch(error => next(error))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// eslint-disable-next-line no-undef
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.use(unknownEndpoint)
