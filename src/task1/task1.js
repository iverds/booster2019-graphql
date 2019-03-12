const { GraphQLServer } = require('graphql-yoga')

// Create your resolvers here
const resolvers = {
  Query: {
    id: () => 'Some ID',
    hello: () => 'Some String',
    number: () => 1234,
    float: () => 1234.45,
    isTrue: () => true
  }
}

const server = new GraphQLServer({ typeDefs: './src/task1/task1.graphql', resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
