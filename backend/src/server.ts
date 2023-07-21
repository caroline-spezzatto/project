import 'reflect-metadata'
import path from 'node:path'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './resolvers/UserResolver'
import mongoose from 'mongoose'
require('dotenv').config()

async function bootstrap() {
  mongoose.connect(`${process.env.MONGO_URL}`)

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  })

  const server = new ApolloServer({ schema })

  const { url } = await server.listen()

  console.log(`🚀 HTTP server running on ${url}`)
}

bootstrap()
