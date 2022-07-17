const express = require('express');

const {
    uploadTicketFile,
    downloadFileMaster,
    downloadFileTicket
} = require('../controllers/filesController');

const Router = express.Router();

Router.route('/upload').post(uploadTicketFile);
Router.route('/downloadmaster/:request(*)').get(downloadFileMaster);
Router.route('/download/:ticket(*)').get(downloadFileTicket);

module.exports = Router;