const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema =  new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true, default: 1 },
    active: { type: Boolean, default: true, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    createdAt: { type: Number, default: Date.now },
})

module.exports = mongoose.model('Product', productSchema);