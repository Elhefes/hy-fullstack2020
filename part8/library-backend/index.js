require('dotenv').config()

const jwt = require('jsonwebtoken')
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  PubSub,
  gql,
} = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const pubsub = new PubSub()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
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
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      } else if (!args.author && args.genre) {
        return Book.find({ genres: args.genre })
      } else if (args.author && !args.genre) {
        return Book.find({ author: args.author })
      } else {
        return Book.find({ author: args.author, genres: args.genre })
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      console.log('current user:')
      console.log(context.currentUser.username)
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => Book.find({ author: root.id }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let fetchedAuthor = await Author.findOne({ name: args.author })
      let author
      if (fetchedAuthor !== null) {
        author = fetchedAuthor
      } else {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book({
        title: args.title, author: author._id,
        published: args.published, genres: args.genres
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const newBook = await Book.findOne({ title: args.title }).populate('author')
      const bookJSON = await newBook.toJSON()
      await pubsub.publish('BOOK_ADDED', { bookAdded: bookJSON })
      return bookJSON
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        try {
          return await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      return null
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

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
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

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})