const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => { //Näytä kaikki
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => { //Näytä yksittäinen
  const blogs = await Blog.find({})
  const blogtoShow = await blogs[request.params.id]
  response.json(blogtoShow.toJSON())
})
  
blogsRouter.post('/', async (request, response, next) => { //Post
  const body = request.body
  
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      id: body._id,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

  blogsRouter.delete('/:id', async (request, response, next) =>{ // Poista
    const blogs = await Blog.find({})
    const blog = await blogs[request.params.id]

    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      if(decodedToken.id == blog.user){
        await Blog.findByIdAndRemove(blog._id)
        try{
          response.status(204).end()
        }catch{
          (error => next(error))
        }
      }
    } catch(exception) {
      next(exception)
    }
  })

  blogsRouter.put('/:id', async (request, response, next) =>{ //Muokkaa
  const body = request.body
  const blogs = await Blog.find({})
  const blogtoShow = await blogs[request.params.id]
  const blog = {
    title: blogtoShow.toJSON().title,
    author: blogtoShow.toJSON().author,
    url: blogtoShow.toJSON().url,
    likes: body.likes
  } 

  await Blog.findByIdAndUpdate(blogtoShow._id, blog, { new: true })
  response.json(blog.toJSON)

  })
  

module.exports = blogsRouter