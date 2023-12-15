const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
    "User",
    new Schema({
        username:  {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        trips: [{
            type: Schema.Types.ObjectId,
            ref: 'Trip'
        }],
        ownedTrips: [{
            type: Schema.Types.ObjectId,
            ref: 'Trip'
        }]
    })
);

module.exports = User;
