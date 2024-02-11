const servicesModel = require("../models/services-model");
// defining services controllers
const services = async (req, res, next) => {
    try {
        // when a user sends a get request, we display all the services from the database which are an array of objects or documents or records
        const allServices = await servicesModel.find();
        res.status(200).json({ allServices: allServices });

    } catch (err) {
        console.error(`server error while getting services : ${err}`);
        // res.status(500).json({ message: "internal server error while getting services" })
        const error = {
            errorDetails: "Internal Server Error While Fetching Services!"
        };
        next(error);
    }
};

// exporting services controller
module.exports = { services };