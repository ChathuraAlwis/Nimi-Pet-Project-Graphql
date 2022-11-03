import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const express = require('express')
const { ApolloServer } = require("apollo-server-express");
const fs = require('fs');
const path = require('path');
const { server_config } = require('./config/server.config')
const router = require('./routes/router')

// resolvers
import employee_salary_resolver from '../middleware/resolvers/employee_salary.resolver.mjs'

async function createApp(){
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, '/../middleware/schema/employee_salary.schema.graphql'),
      'utf8'
    ),
    resolvers: employee_salary_resolver,
  })
  
  const app = express()
  app.use('/employee_salary', router)

  
  await server.start()
  server.applyMiddleware({ app })
  
  app.listen({ port: server_config.port }, () => console.log(`Server is running on http://localhost:${server_config.port}${server.graphqlPath}`))
}

createApp()