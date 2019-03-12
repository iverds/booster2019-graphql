const { GraphQLServer } = require('graphql-yoga')
const { clubs, season_fixtures, goals } = require('../data');

// Create your resolvers here
const resolvers = {
  Query: {
    clubs: () => clubs,
    club: (_, {name}) => clubs.find(club => club.name === name),
    searchClub: (_, {search}) =>
      clubs.find(club => club.name === search.name || club.club_code === search.clubCode)
  },
  Club: {
    shortName: club => club.short_name,
    clubCode: club => club.club_code,
    fixtures: (club, {last}) =>
      season_fixtures
        .reduce((acc, cur) => [...acc, ...cur.fixtures], [])
        .filter(fixture => fixture.home_team_code === club.club_code || fixture.away_team_code === club.club_code)
        .reverse()
        .slice(0, last)  
  },
  Fixture: {
    goals: fixture => goals.filter(goal => goal.home_team === fixture.home_team_code && goal.away_team === fixture.away_team_code)
  },
  Goal: {
    goalScorerName: goal => goal.goal_scorer_name
  }
}

const server = new GraphQLServer({ typeDefs: './src/task3/task3.graphql', resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
