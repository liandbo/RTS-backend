const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
    Name: { type: String, unique: true, trim: true, required: [true, 'Name must be required'] },
    IDnumber: { type: String, lowercase: true, unique: true, trim: true, required: [true, 'IDnumber must be required'] },
    Password: { type: String, unique: false, trim: true, equired: [true, 'Password must be required'], 
        minlength:[6, 'Password must be atleast 6 characters']},
    Role: { type: Number, unique: false, trim: true, required:[true, 'Role must be assigned'] },
    Department: { type: String, unique: false, trim: true, required:[true, 'Department must be assigned'], uppercase: true },
    Phone: { type: String, unique: false, trim: true, required:[true, 'Phone must be assigned']}
},{timestamps: false});

studentSchema.pre('save', function(next) {
    let student = this;
    bcrypt.hash(student.Password,10,function(error,hash) {
        if (error) {
            return next(error);
        } else {
            student.Password = hash;
            next();
        }
    })
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;