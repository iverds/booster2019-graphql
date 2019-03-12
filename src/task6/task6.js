const { GraphQLServer, PubSub } = require('graphql-yoga')
const { clubs, season_fixtures, goals } = require('../data');
const DataLoader = require('dataloader');
const CHAT_CHANNEL = 'CHANNEL';

const getFixtureByClubCodes = clubCodes => {
  const fixtures = season_fixtures.reduce((acc, cur) => [...acc, ...cur.fixtures], [])
  return Promise.resolve(
    clubCodes
      .map(clubCode =>
        fixtures.filter(fixture => fixture.home_team_code === clubCode || fixture.away_team_code === clubCode)
      )
    )
}

const loaders = () => {
  return {
    fixtureLoader: new DataLoader(getFixtureByClubCodes)
  }
} 

// Create your resolvers here
const resolvers = {
  Query: {
    clubs: () => clubs,
    club: (_, {name}) => clubs.find(club => club.name === name),
    searchClub: (_, {search}) =>
      clubs.find(club => club.name === search.name || club.club_code === search.clubCode)
  },
  Mutation: {
    createGoal: (_, args, { pubsub }) => {
      const goal = args;
      goals.push(goal);
      pubsub.publish(CHAT_CHANNEL, { goal })
      return goal;
    }
  },
  Subscription: {
    goal: {
      subscribe: (root, args, { pubsub }) => {
        return pubsub.asyncIterator(CHAT_CHANNEL)
      }
    }
  },
  Club: {
    shortName: club => club.short_name,
    clubCode: club => club.club_code,
    fixtures: (club, {last}, {loaders}) => loaders.fixtureLoader.load(club.club_code).then(result => result.slice(0, last))
  },
  Fixture: {
    goals: fixture => goals.filter(goal => goal.home_team === fixture.home_team_code && goal.away_team === fixture.away_team_code)
  },
  Goal: {
    goalScorerName: goal => goal.goal_scorer_name
  }
}
const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs: './src/task6/task6.graphql', resolvers, context: () => { return { pubsub, loaders: loaders() } } })
server.start(() => console.log('Server is running on localhost:4000'))
