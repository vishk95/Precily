const mongoose = require('mongoose');

//Defining mongodb model and schema
const CountSchema = new mongoose.Schema({
    count: {
        type: Number
    },
    list: [{
        name: String,
        id: Number
    }]
})

const Count = mongoose.model("Count", CountSchema);

module.exports = Count;