const mongoose = require('mongoose');

const Brownie = mongoose.model('Brownie', {
    brownieFlavor: {
        type: String,
        required: true,
    },
    brownieValue: {
        type: Double,
        required: true
    },
})