const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const HCTHSchema = new mongoose.Schema({
    Name: { type: String, unique: true, trim: true, required: [true, 'Name must be required'] },
    IDnumber: { type: String, lowercase: true, unique: true, trim: true, required: [true, 'IDnumber must be required'] },
    Password: { type: String, unique: false, trim: true, equired: [true, 'Password must be required'], 
        minlength:[6, 'Password must be atleast 6 characters']},
    Role: { type: Number, unique: false, trim: true, required:[true, 'Role must be assigned'] },
    Department: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
},{timestamps: false});

HCTHSchema.pre('save', function(next) {
    let HCTH = this;
    bcrypt.hash(HCTH.Password,10,function(error,hash) {
        if (error) {
            return next(error);
        } else {
            HCTH.Password = hash;
            next();
        }
    })
})

const HCTH = mongoose.model('HCTH', HCTHSchema);

module.exports = HCTH;