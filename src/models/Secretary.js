const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const secretarySchema = new mongoose.Schema({
    Name: { type: String, unique: true, trim: true, required: [true, 'Name must be required'] },
    IDnumber: { type: String, unique: true, trim: true, required: [true, 'IDnumber must be required'] },
    Password: { type: String, unique: false, trim: true, equired: [true, 'Password must be required'], 
        minlength:[6, 'Password must be atleast 6 characters']},
    Role: { type: Number, unique: false, trim: true, required:[true, 'Role must be assigned'] },
    Department: { type: String, unique: false, trim: true, required:[true, 'Department must be assigned'] },
},{timestamps: false});

secretarySchema.pre('save', function(next) {
    let secretary = this;
    bcrypt.hash(secretary.Password,10,function(error,hash) {
        if (error) {
            return next(error);
        } else {
            secretary.Password = hash;
            next();
        }
    })
})

const Secretary = mongoose.model('Secretary', secretarySchema);

module.exports = Secretary;