const mongoose = require('mongoose');

const Brownie = mongoose.model('Brownie', {
    brownieFlavor: {
        type: String,
        required: true,
    },
    brownieValue: {
        type: Number,
        required: true
    },
    brownieQuantity: {
        type: Number,
        required: true
    }
})

module.exports = Brownie;