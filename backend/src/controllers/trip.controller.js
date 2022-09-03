const { validationResult } = require('express-validator');

const handleTrip = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        // Validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    const { tripName, startDate, endDate, people } = req.body;

    res.status(200).json({ message: 'The server received the data' });
};

module.exports = { handleTrip };