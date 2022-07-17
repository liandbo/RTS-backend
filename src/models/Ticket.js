const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    Name: { type: String, unique: false, trim: true, required: [true, 'Name must be assigned'] },
    Department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    Status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TicketStatus'
    },
    TargetRole: { type: Number, unique: false, trim: true, required: [true, 'StatusRole must be assigned'] },
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    Request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    },
}, { timestamps: true });


const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;