const { GraphQLServer } = require('graphql-yoga')
const { clubs } = require('../data');

// Create your resolvers here
const resolvers = {
  Query: {
    club: (_, args) => {
      return clubs.find(club => club.name === args.name)
      // return {id: 1, name: "Arsenal", stadium: "?"}
    }
  },
    Club: {
      short: (parent) => parent.short_name
    }
}

const server = new GraphQLServer({ typeDefs: './src/task2/task2.graphql', resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
