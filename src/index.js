import 'core-js'
import 'regenerator-runtime/runtime'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            db,
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
})

server.start({port: process.env.PORT || 4000}, () => {
    console.log('The server is up! Client to localhost:4000 and dirct prisma at localhost:4466 and localhost:4466/_admin or at injected Heroku PORT')
})