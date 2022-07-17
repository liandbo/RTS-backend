const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    Data: {
        Content: { type: String, unique: false, required: false },
        FileName: { type: String, unique: false, required: false }
    },
    Ticket : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    AnswerRole: { type: Number, unique: false, trim: true, required:[true, 'AnswerRole must be assigned']}
},{timestamps: true});


const Data = mongoose.model('Data', dataSchema);

module.exports = Data;