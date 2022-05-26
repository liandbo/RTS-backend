const express = require('express');

const { 
    getStudentTicketList, 
    createTicket, 
    getRequestList,
    getTicketData,
    updateTicket,
    closeTicket

} = require('../controllers/ticketController');
const { verifyToken } = require('../middlewares/verifyToken');


const Router = express.Router();

Router.route('/create').post(verifyToken, createTicket);
Router.route('/getStudentTicketList').get(verifyToken, getStudentTicketList);
Router.route('/getRequestList').get(getRequestList);
Router.route('/getTicketData').get(getTicketData);
Router.route('/updateTicket').post(verifyToken, updateTicket);
Router.route('/closeTicket').put(verifyToken, closeTicket);

module.exports = Router;