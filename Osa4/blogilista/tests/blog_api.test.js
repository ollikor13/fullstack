const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Apitestiblogi',
        author: 'Olli',
        url: 'www.testisivu.fi',
        likes: 26
    },
    {
        title: 'Toinen testiblogi',
        author: 'Olli',
        url: 'www.testisivutoinen.fi',
        likes: 87
    },
    {
        title: 'Blogi',
        author: 'Henkilo',
        url: 'www.google.com',
        likes: 56
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
  })

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(titles).toContain(
        'Toinen testiblogi'
    )
  })

  test('Returned blogs have field named "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('Check if a blog can be added with HTTP POST-request', async () => {
    blogObject = new Blog({title: 'TestBlog',author: 'Tester',url: 'www.testing.com',likes: 73})
    await blogObject.save()
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)
  })

  test('Check if a new blog is given nothing as likes it registers as 0', async () => {
    blogObject = new Blog({title: 'TestBlog',author: 'Tester',url: 'www.testing.com'})
    expect(blogObject.likes).toBe(0)
  })

  test('Check if a new request does not include title and url that it fails', async () => {
    blogObject = new Blog({author: 'Tester'})
    const response = await api.post(blogObject)
    expect(response.status).toBe(400)
  })

afterAll(() => {
  mongoose.connection.close()
})