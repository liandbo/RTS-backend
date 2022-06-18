const mongoose = require('mongoose');

const TicketStatusSchema = new mongoose.Schema({
    Status: { type: String, unique: true, trim: true, required: [true, 'Status is required'] },
},{timestamps: false});

const TicketStatus = mongoose.model('TicketStatus', TicketStatusSchema);

module.exports = TicketStatus;