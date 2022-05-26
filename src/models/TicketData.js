const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    Data: { type: {}, unique: false, required:[true, 'Data must be assigned'] },
    Ticket : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    AnswerRole: { type: Number, unique: false, trim: true, required:[true, 'AnswerRole must be assigned']}
},{timestamps: true});


const Data = mongoose.model('Data', dataSchema);

module.exports = Data;