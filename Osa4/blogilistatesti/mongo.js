const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]

const url = `mongodb+srv://OlliFullstack:${password}@cluster0-df9ln.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const blogSchema = mongoose.Schema({ //Tehty
    title: String,
    author: String,
    url: String,
    likes: Number
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