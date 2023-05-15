const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:[true, 'First name is required']
    },
    lastName: {
        type: String,
        required:[true, 'Last name is required']
    },
    address: {
        type: String,
        required:[true, 'Address is required']
    },
    phone: {
        type: Number,
        required:[true, 'Phone number is required'],
        minLength:[10, 'Password must be 10 characters or more']
    }
}, {timestamps:true});


module.exports = mongoose.model('Order', OrderSchema);