const express = require('express')
const { ApolloServer } = require("apollo-server-express");
const fs = require('fs');
const path = require('path');
const { server_config } = require('./config/server.config')
const router = require('./routes/router')

// resolvers
const employee_salary_resolver = require('../middleware/resolvers/employee_salary.resolver')

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