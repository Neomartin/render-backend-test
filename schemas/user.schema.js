const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true, 
        minlength: 6, 
        maxlength: 40, 
        validate: { 
            // Esta funcion validación se ejecutarán automáticamente cuando se intente guardar un documento en la base de datos. 
            validator: function(v) { return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); }, 
            message: props => `${props.value} is not a valid email!` 
        }
    },
    password:  { type: String, required: true }, // minlength - maxlength
    age: { type: Number, required: true, min: 12, max: 120 },
    active: { type: Boolean, default: true, required: true },
    role: { type: String, enum: ['customer', 'seller', 'admin', 'superadmin'], default: 'customer' },
    permissions: [
        {
          type: String,
          enum: [
            'read_products',
            'create_products',
            'update_products',
            'delete_products',
            'read_orders',
            'update_orders',
            'manage_users',
            'manage_roles',
          ],
        },
      ],
})

module.exports = mongoose.model('User', UserSchema)