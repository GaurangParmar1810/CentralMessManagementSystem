const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messlocationSchema = new Schema({

    longitude: {
        type: Number,
        required: true
    },

    latitude: {
        type: Number,
        required: true
    },

});

const Messlocation = mongoose.model('Messlocation', messlocationSchema);
module.exports = Messlocation;
