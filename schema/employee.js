const {gql} = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    employees : [Employee]
  }

  type Employee {
    id: Int,
    name: String,
    address: String,
    email: String
  }
`;