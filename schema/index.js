const { gql } = require('apollo-server-express');
const employeeSchema = require('./employee');
// const departmentShcema = require('./department');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;

// module.exports = [linkSchema, employeeSchema, departmentShcema];
module.exports = [linkSchema, employeeSchema]