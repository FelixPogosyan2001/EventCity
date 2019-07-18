const Booking = require('../../models/booking.js');
const DateToSring = require('../../helpers/date.js');
const Event = require('../../models/events.js');
const {events,user,singleEvent,transformToEvent,isLogged} = require('./merge.js');

module.exports = {
  bookings : async (args,req) => {
    isLogged(req.isAuth);
    const {userId} = req.userId;
    try {
      let bookings = await Booking.find({user:userId});
      return bookings.map((booking) => {
        return {
          ...booking._doc,
          user : user.bind(this,booking._doc.user),
          event : singleEvent.bind(this,booking._doc.event),
          createdAt : DateToSring(booking._doc.createdAt),
          updatedAt : DateToSring(booking._doc.updatedAt)
        }
      })
    } catch (e) {
      throw new Error(e)
    }
  },
  bookEvent : async (arg,req) => {
    isLogged(req.isAuth);
    const {userId} = req.userId;
    try {
      let event = await Event.findOne({_id:arg.eventId});
      const booking = new Booking({
        user : userId,
        event : event
      });
      let result = await booking.save();
      return result
    } catch (e) {
      throw new Error(e)
    }
  },
  cancelBooking : async (arg) => {
    let {bookingId} = arg;
    let data = await Booking.findById(bookingId).populate('event');
    let ev = transformToEvent(data.event._doc);
    await Booking.deleteOne({_id : bookingId});
    return ev
  }
}
