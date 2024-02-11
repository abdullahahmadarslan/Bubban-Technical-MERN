//requiring mongoose
const mongoose = require("mongoose");

//creating schema i.e. document structure of the database
const servicesSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
});

//creating model using schema
const servicesModel = mongoose.model("Service", servicesSchema);

//exporting model
module.exports = servicesModel;