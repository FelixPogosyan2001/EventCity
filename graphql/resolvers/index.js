const authResolver = require('./auth.js');
const eventsResolver = require('./events.js');
const bookingsResolver = require('./bookings.js');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingsResolver
}
module.exports = rootResolver
