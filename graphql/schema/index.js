const {buildSchema} = require('graphql');

module.exports = buildSchema(`
  type Event {
    _id : ID!
    title : String!
    description : String!
    price : Float!
    date : String!
    creator : User!
  }
  type Booking {
    _id : ID!
    createdAt : String!
    updatedAt : String!
    event : Event!
    user : User!
  }
  type User {
    _id : ID!
    email : String!
    password : String!
    createdEvents : [Event!]
  }
  input UserInput {
    email : String!
    password:String!
  }
  input EventInput {
    title : String!
    description : String!
    price : Float!
    date : String!
  }
  type AuthID {
    userID : ID!
    token : String!
    tokenExpiration : Int!
  }
  type RootQuery {
    events : [Event!]!
    bookings : [Booking!]!
    login(email : String!, password : String!) : AuthID!
  }
  input Replace {
    title : String!
    description : String!
    price : Float!
    date : String!
  }
  type RootMutation {
    createEvent(data:EventInput) : Event
    createUser(userInput : UserInput) : User
    bookEvent(eventId : ID!) : Booking!
    cancelBooking(bookingId : ID!) : Event!
    editEvent(eventId : ID!,data : Replace!) : Event!
  }
  schema {
    query:RootQuery
    mutation:RootMutation
  }
  `)
