const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    Name: { type: String, unique: true, trim: true, required: [true, 'Name is required'] },
    Description: { type: String, unique: false, trim: true, required: [true, 'Description is required'] },
    RoleInCharge: { type: Number, unique: false, trim: true, required: [true, 'Role In Charge is required'] },
    FileName: { type: String, unique: false, trim: true, required: [true, 'File Name is required'] },
},{timestamps: false});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;