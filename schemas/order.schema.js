const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderProducts: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true },
        },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    createdAt: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, enum: ['pending', 'in progress', 'delivered'], default: 'pending' },
    updatedAt: { type: Date, required: true, default: Date.now },
    shippingAddress: { address: String, city: String,  postalCode: String },
    totalPrice: { type: Number, required: true },
    paymentMethod: String,
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
})

module.exports = mongoose.model('Order', OrderSchema);