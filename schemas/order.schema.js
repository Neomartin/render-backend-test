const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: {
        type: [
            {
                productId: { type: String, ref: 'Product' },
                quantity: Number
            }
        ],
        default: []
    },
    userId: { type: String, required: true, ref: 'User' },
    createdAt: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('Order', OrderSchema);