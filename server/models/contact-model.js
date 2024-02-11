//requiring mongoose
const mongoose = require("mongoose");

//creating schema i.e. document structure of the database
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

//creating model using schema
const contactModel = mongoose.model("Contact", contactSchema);

//exporting model
module.exports = contactModel;