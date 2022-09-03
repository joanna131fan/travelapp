const { body } = require('express-validator')

const validate = (method) => {
    switch (method) {
        case 'handleTrip': {
            return [
                body('tripName')
                    .not()
                    .isEmpty()
                    .withMessage('Trip Name is Required')
                    .trim()
                    .escape(),
                body('startDate') 
                    .not()
                    .isEmpty()
                    .withMessage('Pick Start Date')
                    .trim()
                    .escape(),
                body('endDate')
                    .not()
                    .isEmpty()
                    .withMessage('Pick End Date')
                    .trim()
                    .escape(),
                body('people')
                    .not()
                    .isEmpty()
                    .withMessage('Put down at least one person')
                    .trim()
                    .escape(),
            ];
        }
    }
};

module.exports = { validate };