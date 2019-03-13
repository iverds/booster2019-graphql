const { GraphQLServer } = require('graphql-yoga')

// Create your resolvers here
const resolvers = {
  Query: {
    hello: () => 'World'
  }
}

const server = new GraphQLServer(
  { typeDefs: './src/examples/example.graphql', resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
