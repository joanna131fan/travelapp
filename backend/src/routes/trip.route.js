const express =  require('express');
const router = express.Router();

const { handleTrip } = require('../controllers/trip.controller');

const { validate } = require('../middlewares/validator.middleware');

router.post('/trip', validate('handleTrip'), handleTrip);

module.exports = router;