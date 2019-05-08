const base = 'http://localhost:3000';
const fetch = require('node-fetch');

module.exports = {
  Query : {
    employees : async () => {
      //call /employees
      return await fetch(`${base}/employees`).then(response => response.json())
    },
    employee: async(parent, { id }, context) => {
      return await fetch(`${base}/employees/${id}`, {
        method: 'GET',
        headers: {
          Authorization: context.authHeader
        }
      }).then(response => response.json())
    }
  },
  Employee: {
    department: async (parent) => {
      // console.log(parent);
      return await fetch(`${base}/departments/${parent.department}`).then(response => response.json());
    }
  },

};