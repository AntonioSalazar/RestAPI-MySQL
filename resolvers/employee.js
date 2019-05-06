const base = 'http://localhost:3000';
const fetch = require('node-fetch');

module.exports = {
  Query : {
    employees : async () => {
      //call /employees
      return await fetch(`${base}/employees`).then(response => response.json())
    }
  }
};