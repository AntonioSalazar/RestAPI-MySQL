const setting = require('./routes/settings');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex')({
  client: 'mysql',
  connection: setting.database
})


//Simulating that the info below comes from a form from a web app

const username = 'Antonio';
const password = 'password';

knex('users').where({
  username
}).then(response => {
  //from the line below, password is the information submitted by the user and response[0].password is the hashed password we have hashed in DB
  bcrypt.compare(password, response[0].password, (error, result) => {
    if (result) {
      console.log('Authentication succesfull');
      const payload = {
        username: 'Antonio',
        isAdmin: true
      }
      //the secret obviously doesnt have to be here, use environment variables, i.e process.env.SECRET
      const secret = 's3cr3t';
      const expiresIn = 3600;
      const token = jwt.sign(payload, secret, {expiresIn});
      console.log(token); 
    } else {
      console.log('Incorrect password');
    }
  })
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFudG9uaW8iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTcwMzM3NDksImV4cCI6MTU1NzAzNzM0OX0.Edzlg7luhSeL6amzBxGvjCYZz-pr3SJORDKaIwXVpvM