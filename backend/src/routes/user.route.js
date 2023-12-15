const express = require('express');
const router = express.Router();

const db = require("../models");

const { handleNewUser, handleLogin } = require('../controllers/user.controller');
const { validate } = require('../middlewares/validator.middleware');

router.post('/signup', validate('handleNewUser'), handleNewUser);
router.post('/login', validate('handleLogin'), handleLogin);

module.exports = router;