const User = require('../../models/user.js');
const Event = require('../../models/events.js');
const DataLoader = require('dataloader');
const DateToSring = require('../../helpers/date.js');

const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds)
})

const userLoader = new DataLoader((userIds) => {
  return User.find({_id : {$in : userIds}});
})

const transformToEvent = (args) => {
  return {
    ...args,
    creator : user.bind(this,args.creator),
    date : DateToSring(args.date)
  }
}

const isLogged = (answer) => {
  if (!answer) {
    throw new Error('Unauthenticated');
  }
}

const events = async (eventIds) => {
  try {
    let events = await Event.find({_id : {$in : eventIds}})
      return events.map((event) => {
        return transformToEvent(event._doc);
    });
  } catch (error) {
    throw error;
  }
}

const singleEvent = async (eventId) => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch(e) {
    throw e
  }
}

const user = async (userId) => {
  try {
    let client = await userLoader.load(userId.toString());
    return {...client._doc,createdEvents:eventLoader.load.bind(this,client._doc.createdEvents)}
  } catch (error) {
    throw error
  }
}
module.exports.user = user;
module.exports.singleEvent = singleEvent;
module.exports.events = events;
module.exports.transformToEvent = transformToEvent;
module.exports.isLogged = isLogged
