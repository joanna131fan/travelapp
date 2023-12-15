const { body } = require('express-validator')
const db = require('../models')

const validate = (method) => {
    switch (method) {
        case 'handleLogin': {
            return [
                body('username')
                    .exists()
                    .withMessage('Username is Required')
                    .custom(async (value, { req }) => {
                        const user = await db.User.findOne({ where: { username: value }});
                        if(!user) {
                            throw new Error('Username does not exist');
                        }
                        return true;
                    }),
                body('password')
                    .exists()
                    .withMessage('Password is Required')
                    .custom(async (value, { req }) => {
                        const user = await db.User.findOne({ where: { username: req.body.username }});
                        if (!user) {
                            throw new Error('Username does not exist');
                        }
                        const match = await bcrypt.compare(value, user.password); // TODO: import bcrypt
                        if (!match) {
                            throw new Error('Incorrect Password');
                        }
                        return true;
                    }),
            ];
        }
        case 'handleNewUser': {
            return [
                body('username')
                    .exists()
                    .withMessage('Username is Required')
                    .isLength({min: 3, max: 20})
                    .withMessage('Username must be between 3 and 20 characters long')
                    .custom(async (value, { req }) => {
                        const user = await db.User.findOne({ where: { username: value }});
                        if(user) {
                            throw new Error('Username already exists');
                        }
                        return true;
                    }),
                body('email')
                    .exists()
                    .withMessage('Email is Required')
                    .isEmail()
                    .withMessage('Email is not valid')
                    .custom(async (value, { req }) => {
                        const user = await db.User.findOne({ where: { email: value }});
                        if(user) {
                            throw new Error('Account with this email already exists');
                        }
                        return true;
                    }),
                body('password')
                    .exists()
                    .withMessage('Password is Required')
                    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,50}$/)
                    .withMessage('Password must contain at least one digit, at least one special character and be between 6-50 characters long'),
                body('confirm_password')
                    .exists()
                    .withMessage('Confirm Password')
                    .custom(async (value, { req }) => {
                        const password = req.body.password;
                        if(password != value) {
                            throw new Error('Passwords must be same');
                        }
                        return true;
                    }),
            ];
        }
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