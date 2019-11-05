const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if(body.username.length >= 3 && body.password.length >= 3){
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })
  
      const savedUser = await user.save()
  
      response.json(savedUser)
    }else{
      return response.status(401).json({ error: 'Password or username too short'})
    }

  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, author: 1})
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter