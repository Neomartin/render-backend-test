const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    active: Boolean
})

module.exports = mongoose.model('User', UserSchema)


// name: "John Doe"
// age: "32"
// email: "john@doe.com"
// active: true