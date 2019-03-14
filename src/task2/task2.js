const { GraphQLServer } = require('graphql-yoga')
const { clubs, season_fixtures } = require('../data');

// Create your resolvers here
const resolvers = {
  Club: {
    fixtures: (club, args) => {
      return season_fixtures
        .reduce((acc, cur) => [...acc, ...cur.fixtures], [])
        .filter(fixture => fixture.home_team_code === club.club_code || fixture.away_team_code === club.club_code)
        .reverse()
        .slice(0, args.last)
    }
  },
  Query: {
    clubs: (_, args) => clubs
  }
}

const server = new GraphQLServer({ typeDefs: './src/task2/task2.graphql', resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
