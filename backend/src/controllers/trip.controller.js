const { validationResult } = require('express-validator');

const handleTrip = (request, response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        // Validation errors
        return response.status(400).json({ errors: errors.array() });
    }

    const { tripName, startDate, endDate, people } = request.body;

    response.status(200).json({ message: 'The server received the data' });
};

module.exports = { handleTrip };