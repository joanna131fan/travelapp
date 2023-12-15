const express = require('express');
const mongoose = require("mongoose");
const db = require("./models");
const dotenv = require("dotenv");

dotenv.config();

const mongoDB = process.env.DB_URL;

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/', require('./routes/trip.route'));
app.use('/signup', require('./routes/user.route'));
app.use('/login', require('./routes/user.route')); 
app.get('/trip', function(req, res) {
    res.send('Hello');//add later
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
// in user.route.js
const createUser = function(user) {
    return db.User.create(user).then(docUser => {
        console.log("\n>> Created User:\n", docUser);
        return docUser;
    });
};

const createTrip = function(trip) {
    return db.Trip.create(trip).then(docTrip => {
        console.log("\n>> Created Trip:\n", docTrip);
        return docTrip;
    });
};

const createEvent = function(event) {
    return db.Event.create(event).then(docEvent => {
        console.log("\n>> Created Event:\n", docEvent);
        return docEvent;
    });
};

// TODO: addTripsToUser, addUsersToTrip, addEventsToTrip, addUserToEvent, addTripToEvent, addOwnerToTrip, addTripToOwner, addCreatorToEvent
const addTripToUser = function(userId, trip) {
    return db.User.findByIdAndUpdate(
        userId, 
        { $push: { trips: trip._id} },
        { new: true, useFindAndModify: false}
    );
};

const addUserToTrip = function(tripId, user) {
    return db.Trip.findByIdAndUpdate(
        tripId,
        { $push: { users: user._id} },
        { new: true, useFindAndModify: false}
    );
};

const addEventToTrip = function(tripId, event) {
    return db.Trip.findByIdAndUpdate( 
        tripId,
        { $push: { events: event._id} },
        { new: true, useFindAndModify: false}
    );
};

const addUserToEvent = function(eventId, user) {
    return db.Event.findByIdAndUpdate(
        eventId,
        { $push: { votes: user._id} },
        { new: true, useFindAndModify: false}
    );
};

const addTripToEvent = function(eventId, trip) {
    return db.Event.findByIdAndUpdate(
        eventId,
        { $set: { trip: trip._id} },
        { new: true, useFindAndModify: false}
    );
};

const addOwnerToTrip = function(tripId, user) {
    return db.Trip.findByIdAndUpdate(
        tripId,
        { $set: { owner: user._id} },
        { new: true, useFindAndModify: false}
    );
};

const addTripToOwner = function(userId, trip) {
    return db.User.findByIdAndUpdate(
        userId,
        { $push: { ownedTrips: trip._id} },
        { new: true, useFindAndModify: false}
    );
};

const addCreatorToEvent = function(eventId, user) {
    return db.Event.findByIdAndUpdate(
        eventId,
        { $set: { creator: user._id} },
        { new: true, useFindAndModify: false}
    );
};

// Populate

const getTripWithPopulate = function(id) {
    return db.Trip.findById(id)
    .populate("users")
    .populate("owner")
    .populate("events");
};

const getUserWithPopulate = function(id) {
    return db.User.findById(id)
    .populate("trips")
    .populate("ownedTrips");
};

const getEventWithPopulate = function(id) {
    return db.Event.findById(id)
    .populate("creator")
    .populate("trip")
    .populate("votes");
};

// Add Test Cases
const run = async function() {
    var trip1 = await createTrip({
        name: "Spain",
        startDate: new Date("01-01-2003"),
        endDate: new Date("01-08-2003")
    });
    var user1 = await createUser({
        username: "bob",
        email: "hi@gmail.com",
        password: "need_password"
    });
    var user2 = await createUser({
        username: "carl",
        email: "hello@gmail.com",
        password: "need_password"
    });
    var event1 = await createEvent({
        name: "barcelona food tour"
    });
    var trip = await addOwnerToTrip(trip1._id, user1);
    trip = await addUserToTrip(trip1._id, user2);
    trip = await addEventToTrip(trip1._id, event1);
    console.log("\n>>Trip: \n", trip);
    var event = await addCreatorToEvent(event1._id, user2);
    event = await addUserToEvent(event1._id, user1);
    event = await addTripToEvent(event1._id, trip1);
    console.log("\n>>Event: \n", event);
    var user_1 = await addTripToOwner(user1._id, trip1);
    user_1 = await addTripToUser(user1._id, trip1);
    console.log("\n>>User 1:\n", user_1);
    var user_2 = await addTripToUser(user2._id, trip1);
    console.log("\n>>User 2:\n", user_2);
    trip = await getTripWithPopulate(trip1._id);
    console.log("\n>> Populated Trip:\n", trip);
    event = await getEventWithPopulate(event1);
    console.log("\n>> Populated Event:\n", event);
    user_1 = await getUserWithPopulate(user1._id);
    console.log("\n>> Populated User 1:\n", user_1);
    user_2 = await getUserWithPopulate(user2._id);
    console.log("\n>> Populated User 2:\n", user_2);

};
mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));

run();

// https://www.bezkoder.com/mongodb-many-to-many-mongoose/
// https://dev.to/nehalahmadkhan/many-to-many-relationship-in-mongodb-nodejs-express-mongoose-4djm

// // Patches
// const {inject, errorHandler} = require('express-custom-error');
// inject(); // Patch express in order to use async / await syntax

// // Require Dependencies

// const express = require('express');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const helmet = require('helmet');


// const logger = require('./util/logger');

// // Load .env Enviroment Variables to process.env

// require('mandatoryenv').load([
//     'DB_URL',
//     'PORT',
//     'SECRET'
// ]);

// const { PORT } = process.env;


// // Instantiate an Express Application
// const app = express();


// // Configure Express App Instance
// app.use(express.json( { limit: '50mb' } ));
// app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// // Configure custom logger middleware
// app.use(logger.dev, logger.combined);

// app.use(cookieParser());
// app.use(cors());
// app.use(helmet());

// // This middleware adds the json header to every response
// app.use('*', (req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     next();
// })

// // Assign Routes

// app.use('/', require('./routes/trip.route'));


// // Handle errors
// app.use(errorHandler());

// // Handle not valid route
// app.use('*', (req, res) => {
//     res
//     .status(404)
//     .json( {status: false, message: 'Endpoint Not Found'} );
// })

// // Open Server on selected Port
// app.listen(
//     PORT,
//     () => console.info('Server listening on port ', PORT)
// );