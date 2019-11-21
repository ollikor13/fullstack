const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const uuid = require('uuid/v1')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const ObjectId = require('mongoose').Types.ObjectId;
ObjectId.prototype.valueOf = function () {
	return this.toString();
};


const jwt = require('jsonwebtoken')

const JWT_SECRET = 'salaisuus'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://OlliFullstack:1234@cluster0-df9ln.mongodb.net/librarydb?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Author {
    name: String!
    numberofBooks: Int!
    born: Int
    _id: ID!
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    numberofBooks(author: String!): Int!
    me: User
  }
  type Mutation {
    addBook(
      title: String!,
      author: String,
      published: Int!,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int,
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Mutation: {
    addBook: async (root, args, context) => {
      if(context.currentUser){
        try{
          const tulos = await Author.find()
          const onko = tulos.some(item => item.name === args.author)
  
          if(!onko){
            const author = new Author({ name: args.author })
            const book = new Book({ title: args.title, published: args.published, author: author._id, genres: args.genres })
            try{
              await book.save()
              await author.save()
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }
            return book
  
          }else{
            const henkilo = tulos.find(item => item.name === args.author)
            const book = new Book({ title: args.title, published: args.published, author: henkilo._id, genres: args.genres })
            try{
              await book.save()
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
            })
            }
            return book
          }
        } catch(exception) {
          console.log(exception)
        }
      }else{
        console.log("No authorization given!")
      }


    },
    editAuthor: async (root, args, context) => {
      if(context.currentUser){
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      }else{
        console.log("No authorization given!")
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
  ,
  Query: {
    hello: () => { return "world" },
    bookCount: () => {
      return Book.collection.countDocuments()
    },
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return await Book.find({})
    },
    allAuthors: () => {
      return Author.find({})
    },
    numberofBooks: (root, args) => {
      result = books.filter(p => p.author === args.author)
      return result.length
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    numberofBooks(author) {
      let tulos = 0
      function getPromise(){
        var promise = Book.find({}).exec();
        return promise;
      }
      var promise = getPromise();
      return promise.then(function(kirjat){
        const joku = kirjat.filter(kirja => kirja.author.equals(author._id))
        return joku.length
      })
    },

  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})