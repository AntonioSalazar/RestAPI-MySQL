require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
// const mongoose     = require('mongoose');
// const mysql        = require('mysql');
const logger       = require('morgan');
const path         = require('path');
const settings     = require('./routes/settings');
const knex         = require('knex')({
  client: 'mysql',
  connection: settings.database
})
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers/index');
const schema    = require('./schema/index');
const server    = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: ({req}) => {
    return { authHeader: req.headers.authorization}
  }
})



//code below is how to connect to mysql using the mysql native driver
// const connection   = mysql.createConnection(settings.database);
// connection.connect(err => {
//   if (err) {
//     console.log('error connecting to mysql ->', err);
//     return process.exit();
//   } else {
//     console.log(`connected to MySQL ${settings.database.database} database`);
//   }
// })

//code below is how to connect to mongodb 
// mongoose
//   .connect('mongodb://localhost/restapiproject', {useNewUrlParser: true})
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });



const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
server.applyMiddleware({app});

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with an express generator';
//below line of code is needed to connect to mysql db using the mysql native driver
// app.locals.connection = connection;
//below line of code is needed to connect using knex.js
app.locals.knex = knex;


const index = require('./routes/index');
app.use('/', index);


module.exports = app;
