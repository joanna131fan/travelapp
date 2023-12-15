const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = mongoose.model(
    "Event",
    new Schema({
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        trip: {
            type: Schema.Types.ObjectId,
            ref: 'Trip'
        },
        votes: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {type: String, required: true}
        //TODO: add other fields
    })
);

module.exports = Event;