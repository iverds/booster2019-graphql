const { GraphQLServer } = require('graphql-yoga')

// Create your resolvers here
const resolvers = {
  Query: {

  }
}

const server = new GraphQLServer({ typeDefs: './src/task6/task6.graphql', resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
