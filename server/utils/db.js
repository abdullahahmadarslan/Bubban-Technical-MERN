// requiring mongoose library
const mongoose = require("mongoose");

//creacting connection with mongodb atlas
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("successfully connected to the database");
    } catch (error) {
        console.log("error connecting to the database");
        //process or node js app terminated wiith an error
        process.exit(1);
    }
};

//exporting the response i.e. a promise of the dbConnection function
module.exports = dbConnection;
