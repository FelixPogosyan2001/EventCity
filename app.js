const express = require('express');
const bodyParser = require('body-parser');
const graphql = require('express-graphql');
const mongoose = require('mongoose');
const graphQLSchema = require('./graphql/schema/index.js');
const resolvers = require('./graphql/resolvers/index.js');
const isAuth = require('./middleware/isAuth.js');

//Config App
const app = express();
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next()
});
app.use(bodyParser.json());
app.use(isAuth);
app.use('/graphql',graphql({
  schema: graphQLSchema,
  rootValue : resolvers,
  graphiql:true
}));

//Connect with the Server and MongoDB
app.listen(2019,() => {
  mongoose.connect('mongodb://localhost:27017/events',(error) => {
    if (error) throw error;
    console.log('MongoDb is starting')
  });
  console.log('App is working')
})
