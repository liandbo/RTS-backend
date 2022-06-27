const express = require('express');

const {
    uploadTicketFile
} = require('../controllers/filesController');

const Router = express.Router();

Router.route('/upload').post(uploadTicketFile);

module.exports = Router;