build-lists: true

## Getting started with GraphQL

### Iver Skjervum-Karlsen

---

![inline fit](./blank.jpg)

---

# Motivation

- Reflect on how you fetch data from a client
- Try out GraphQL
- Make you curious

# Agenda

1. Introduction
2. GraphQL. What is it?
3. Queries
4. Mutations
5. Subscriptions

---

# Introduction

---

#When we fetched HTML


![inline fit](./img1-1.png)

---
#Single Page Applications (SPA)

![inline fit](./img1-2.png)

---

#Challenges with REST

- Hard to do correct (for me at least)
- Often ends up with REST-ish endpoints
- Underfetching and Overfetching

---

# Case: Sports application

- Clubs
- Players
- Fixtures

---

# Two pages:

- One with one club, list of players and last 5 fixtures
- One with all the clubs, and their last match

---

# With REST

- `/clubs`
- `/clubs/{id}`
- `/clubs/{id}/players`
- `/clubs/{id}/season_fixtures`

---

# `/clubs`

```javascript
[
    {
        id: 1,
        name: "Arsenal",
        club_code: "ARS",
        stadium: "Emirates Stadium",
        capacity: 59867,
        manager: "Unai Emery",
        manager_nationality: "Spain",
        position: 5,
        players: { href: "/api/clubs/1/players" },
        season_fixtures: { href: "/api/clubs/1/fixtures" }
    },
    {
        id: 2,
        name: "Bournemouth",
        club_code: "BOU",
        stadium: "Vitality Stadium",
        capacity: 11360,
        manager: "Eddie Howe",
        manager_nationality: "England",
        position: 12,
        players: { href: "/api/clubs/2/players" },
        season_fixtures: { href: "/api/clubs/2/fixtures" }
    },
]
```

---

# REST(ish)

- `/GetClubWithPlayersAndFixturesById`
- `/GetClubsWithFixtures`
- `/GetClubsWithLastMatch`

---

# Example here?

---

## Underfetching
- And endpoint doesn't provide enough information
- N+1 problem

## Overfetching
- We get a lot of data that we don't need

---

# GraphQL. What is it?

---

- It let's us specify the the data we need in a query
- Easy to write correct
- Get schema and typing
- No silver bullet

---

#Demo

---

# How it works

- Operations
- Schema
- Resolvers

---

# Operations

- `query`: Query for data
- `mutation`: Creating and updating data, and return data
- `subscription`: Subscribe on data changes (like websockets)

---


## Query

```json
query {
    hello
}
```

## Response

```json
{
    "data": {
        "hello": "Hello World!"
    }
}
```

---

# Schema

```json
type Query {
    id: ID
    hello: String!
    number: Int
    float: Float
    isTrue: Boolean
}
```

---

# Resolver

```javascript

const resolvers = {
    Query: {
        id: (parent, args, context, info) => 1,
        hello: () => 'Hello World!',
        number: () => 12345,
        float: () => 123.45,
        isTrue: () => true
    }
}
```

---
# Complete example

```javascript

const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  hello: String!
}
`

const resolvers = {
  Query: {
    hello: (parent, args, context, info) => 'Hello World!'
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))

```
---

# Task1 - a simple query

Create a simple query that returns one or more of the built in scalars

- `git clone https://...`
- `npm install`
- `npm start`

---

# Custom types

```json
type Human {
    id: ID!
    first_name: String!
    last_name: String!
    age: Int!
}
```

---

# Parameters

```json 
type Query {
    human(id: ID!): Human
}
```

````javascript
const resolvers = {
    human = (parent, args, context, info) => {
        console.log("Id: ", args.id);
        ...
    }
}
```

---

# Task 2

Create a query that return a club by name

- Get data from `data.js` (Thanks to https://github.com/drraq)
- `const { clubs } = require('./data')` 

---

# Lists

```json
type Query {
    humans: [Human!]!
}
```

---

# Nested resources

```json
type Human {
    ...,
    friends: [Human]
}
```

```javascript
const resolvers = {
    Query: {
        humans: () => {...}
    },
    Human: {
        friends: () => {...}
    }
}
```

---

# Task 3

Create a query that return that returns a list of clubs, and include the last x fixtures

---

# Mutations

```json
type Mutation {
    createHuman(first_name: String, last_name: String, age: Int)
}
```

```javascript
const resolvers = {
    Mutation: {
        createHuman: (parent, args) => {
            humans.push(new Human(args.first_name, args.last_name, args.age))
        }
    }
}
```

---

# Task 4

Create a mutation that creates a goal for a fixture and returns it

---

# Subscriptions

```json
type Subscription {
    humanBorn: Human
}
```

---

```javascript
const { GraphQLServer, PubSub } = require('graphql-yoga')
const CHAT_CHANNEL = 'CHANNEL';

const resolvers = {
    Mutation: {
        createHuman: (parent, args) => {
            ...
            pubsub.publish('CHAT_CHANNEL', { humanBorn: human })
        }
    },
    Subscription: {
        messageSent: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(CHAT_CHANNEL)
            }
        }
    }
}

const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } })
```

---

# Task 5

Create a subscription that subscribes to new goals

---

#Resources

https://github.com/iverds/booster2019-graphql

---

# TODO

- Fragments
- Annotations (@include)
- DataLoader
- Clients? Relay/Apollo


---

#Thank you
