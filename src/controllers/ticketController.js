const jwt = require('jsonwebtoken');
const Ticket = require('../models/Ticket');
const TicketData = require('../models/TicketData');
const Request = require('../models/Request');

exports.getStudentTicketList = async (req, res, next) => {
    try {
        const role = req.role;
        const userId = req.user;
        if (role === parseInt(process.env.ROLE_STUDENT)) {
            const ticketList = await Ticket.find({ status: 'Open', Student: userId });
            res.status(200).json({
                status: 'get student ticketlist success',
                data: { ticketList }
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.createTicket = async (req, res, next) => {
    try {
        const role = req.role;
        const userId = req.user;
        const requestId = req.body.requestId;
        const target = req.body.TargetRole;
        const department = req.body.Department;
        const data = req.body.Data;
        if (role === Number(process.env.ROLE_STUDENT)) {
            const ticketCreated = await Ticket.create({ 
                Department: department,
                Status: "Open",
                TargetRole: target,
                Student: userId, 
                Request: requestId 
            });
            const firstTicketData = await TicketData.create({
                Ticket: ticketCreated._id,
                AnswerRole: Number(process.env.ROLE_STUDENT),
                Data: data
            });
            res.status(200).json({
                status: 'create success',
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.getRequestList = async (req,res,next) => {
    try {
        const requestList = await Request.find({});
        res.status(200).json({
            status: 'getReuestList success',
            data: {requestList}
        });
    } catch (error) {
        next(error);
    }
};

exports.getTicketData = async (req,res,next) => {
    try {
        const ticket = req.body.Ticket;
        const dataList = await TicketData.find({Ticket: ticket});
        res.status(200).json({
            status: 'getTicketData success',
            data: {dataList}
        });
    } catch (error) {
        next(error);
    }
};

exports.updateTicket = async (req, res, next) => {
    try {
        const ticket = req.body.Ticket;
        const data = req.body.Data;
        const role = req.role;
        const dataAdd = await TicketData.create({
            Ticket: ticket,
            AnswerRole: role,
            Data: data
        });
        res.status(200).json({
            status: 'updateTicket success',
        });
    } catch (error) {
        next(error);
    }
};

exports.closeTicket = async (req, res, next) => {
    try {
        const role = req.role;
        const ticket = req.body.Ticket;
        if (role === Number(process.env.ROLE_SECRETARY)) {
            const closeTicket = await Ticket.findByIdAndUpdate(ticket, {
                Status: 'Closed'
            });
            res.status(200).json({
                status: 'Close ticket successful',
            });
        } else {
            res.status(404).json({
                status: 'Failed',
                message: 'Unauthorized'
            });
        }
    } catch (error) {
        next(error);
    }
};

