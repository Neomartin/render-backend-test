const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const uploadSchema = new Schema({
    name: { type: String, required: true },
    data: {type: Buffer },
    contentType: { type: String },
});

module.exports = mongoose.model('Upload', uploadSchema);