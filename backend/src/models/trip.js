const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Trip = mongoose.model(
    "Trip",
    new Schema({
        name:  {type: String, required: true},
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        events: [{
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }]
        //TODO: other fields
    })
);

module.exports = Trip;