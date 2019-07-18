const Event = require('../../models/events.js');
const User = require('../../models/user.js');
const {events,user,singleEvent,transformToEvent} = require('./merge.js');
const {isLogged} = require('./merge.js');

module.exports = {
  events : async () => {
    let events = await Event.find();
    return events.map(event => transformToEvent(event._doc));
  },
  createEvent:async(args,req) => {
    isLogged(req.isAuth);
    const {userId} = req.userId;
    const event = new Event({
      title : args.data.title,
      description : args.data.description,
      price : +args.data.price,
      date : args.data.date,
      creator: userId
    });
    let createdEvent;
    let result = await event.save();
    createdEvent = transformToEvent(result._doc);
    try {
      let user = await User.findById('5d24fe589dd58714d48b0ff7')
      if (!user) throw new Error('Not found');
      user.createdEvents.push(event)
      await user.save();
      return createdEvent
    } catch (e) {
      console.log(e);
    }
  },
  editEvent : async ({eventId,data}) => {
    console.log(eventId,data)
    return await Event.findByIdAndUpdate(eventId,data)
  }
}
