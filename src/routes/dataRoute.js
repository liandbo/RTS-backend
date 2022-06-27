const express = require('express');

const { 
    getStudentTicketList, 
    createTicket, 
    getRequestList,
    getTicketData,
    updateTicket,
    closeTicket,
    addDepartment,
    getDepartment,
    addTicketStatus,
    getSecretaryTicketList

} = require('../controllers/ticketController');
const { verifyToken } = require('../middlewares/verifyToken');


const Router = express.Router();

Router.route('/create').post(verifyToken, createTicket);
Router.route('/getStudentTicketList').get(verifyToken, getStudentTicketList);
Router.route('/getSecretaryTicketList').get(verifyToken, getSecretaryTicketList);
Router.route('/getRequestList').get(getRequestList);
Router.route('/getTicketData').get(getTicketData);
Router.route('/updateTicket').post(verifyToken, updateTicket);
Router.route('/closeTicket').put(verifyToken, closeTicket);
Router.route('/addDepartment').post(addDepartment);
Router.route('/getDepartment').get(getDepartment);
Router.route('/addTicketStatus').post(addTicketStatus);

module.exports = Router;