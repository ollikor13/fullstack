const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
  }


mongoose.connect(url, { useNewUrlParser: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  })

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: "ayy",
    author: "limao",
    url: "google.com",
    likes: "123"
})

blog.save().then(() => {
  console.log('blog saved!')
  mongoose.connection.close()
})