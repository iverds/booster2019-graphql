const { GraphQLServer } = require('graphql-yoga')


// Create your types here
const typeDefs = ``

// Create your resolvers here
const resolvers = {
  Query: {

  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
