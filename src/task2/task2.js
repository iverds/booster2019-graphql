const { GraphQLServer } = require('graphql-yoga')
const { clubs } = require('../data');

// Create your resolvers here
const resolvers = {
  Query: {
    club: (parent, {name}) => clubs.find(club => club.name === name),
    searchClub: (parent, {search}) =>
      clubs.find(club => club.name === search.name || club.club_code === search.clubCode)
  },
  Club: {
    shortName: club => club.short_name,
    clubCode: club => club.club_code
  }
}

const server = new GraphQLServer({ typeDefs: './src/task2/task2.graphql', resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
