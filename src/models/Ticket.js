const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    Department: { type: String, unique: false, trim: true, required:[true, 'Department must be assigned'] },
    Status: { type: String, unique: false, trim: true, required:[true, 'Status must be assigned'] },
    TargetRole: { type: Number, unique: false, trim: true, required:[true, 'StatusRole must be assigned'] },
    Student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
},{timestamps: true});


const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;