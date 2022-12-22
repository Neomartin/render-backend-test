const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true, minlength: 6, maxlength: 30  },
    password:  { type: String, required: true }, // minlength - maxlength
    age: { type: Number, required: true, min: 12, max: 120 },
    active: { type: Boolean, default: true, required: true },
})

module.exports = mongoose.model('User', UserSchema)