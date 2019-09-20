const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/users')

const initialUsers = [
    {
        username: 'Username1',
        name: 'Name1',
        password: 'password',
    },
    {
        username: 'Username2',
        name: 'Name2',
        password: 'secret',
    },
    {
        username: 'Username3',
        name: 'Name3',
        password: '1234',
    }
]

beforeEach(async () => {
    await User.deleteMany({})
  
    let userObject = new User(initialUsers[0])
    await userObject.save()
  
    userObject = new User(initialUsers[1])
    await userObject.save()

    userObject = new User(initialUsers[2])
    await userObject.save()
  })


    test('Username is too short', async () => {
        const testUser = new User({
            username: 'un',
            name: 'MyName',
            password: 'Verysecret'
        })
        try{
            await testUser.save()
        }catch(exception){
            expect(exception.status).toBe(401)
        }
    }),
    test('Password is too short', async () => {
        const testUser = new User({
            username: 'User',
            name: 'MyName',
            password: 'vs'
        })
        try{
            await testUser.save()
        }catch(exception){
            expect(exception.status).toBe(401)
        }
    }),
    test('Username is duplicate', async () => {
        const testUser = new User({
            username: 'Username1',
            name: 'MyName',
            password: 'vs'
        })
        try{
            await testUser.save()
        }catch(exception){
            expect(exception.name).toBe('ValidationError')
        }
    }),

  afterAll(() => {
    mongoose.connection.close()
  })