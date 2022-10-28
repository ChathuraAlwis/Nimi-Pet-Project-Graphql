const { ApolloServer } = require("apollo-server");
const fs = require('fs');
const path = require('path');

// resolvers
const employee_salary_resolver = require('../middleware/resolvers/employee_salary.resolver')


const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, '/../middleware/schema/employee_salary.schema.graphql'),
    'utf8'
  ),
  resolvers: employee_salary_resolver,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );