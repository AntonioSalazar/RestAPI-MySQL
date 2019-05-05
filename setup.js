//How to create a table using knex.js
const setting = require('./routes/settings');
const knex = require('knex')({
  client: 'mysql',
  connection: setting.database
})

const bcrypt = require('bcryptjs');
const saltRounds = 10;

knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    return knex.schema.createTable('users', table => {
      table.increments('id')
      table.string('username')
      table.string('password')
    })
    .then(() => console.log('Users table has been created'))
    .catch(err => console.log(err))
  } else {
    const username = 'Antonio'
    const password = 'password'
    bcrypt.genSalt(saltRounds, (error, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        return knex('users').insert({ username, password: hash})
        .then(() => console.log(`${username} inserted`))
        .catch(err => console.log(err));
      });
    });
  }
}).catch(err => console.log(err));
