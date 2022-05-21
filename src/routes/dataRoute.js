const express = require('express');

const { getStudentTicketList, createTicket } = require('../controllers/ticketController');
const { verifyToken } = require('../middlewares/verifyToken');


const Router = express.Router();

Router.route('/create').post(verifyToken, createTicket);
Router.route('/getStudentTicketList').get(verifyToken, getStudentTicketList);

module.exports = Router;