const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    Name: { type: String, unique: true, trim: true, required: [true, 'Name is required'] },
    ShortName: { type: String, unique: true, trim: true, required: [true, 'ShortName is required'] },
},{timestamps: false});

const Department = mongoose.model('Department', DepartmentSchema);

module.exports = Department;