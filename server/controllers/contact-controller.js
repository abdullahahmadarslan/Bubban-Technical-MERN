//requiring model of db
const contactModel = require("../models/contact-model");
const authModel = require("../models/auth-model");

//contact controller
const contact = async (req, res, next) => {
    try {
        //destructuring data from request body of the client side post request
        const { name, email, phone, message } = req.body;

        const dbDocument = await contactModel.create({ email, name, phone, message });
        res.status(201).json({
            message: `message recorded! ${dbDocument}`
        });
    }
    catch (err) {
        console.error(`server error while recording message : ${err}`);
        // res.status(500).json({ message: "internal server error while while recording message" })
        const error = {
            errorDetails: "Internal Server Error while recording message!"
        };
        next(error);
    }
};

//get user data controller which sends data to the front end
const getUserData = async (req, res) => {
    try {
        //destructuring data or payload from req.userData
        // console.log(req.userData.email);

        //finding the document or record of this email from the data base and sending that record to the front end which is the user data
        const userData = await authModel.findOne({ email: req.userData.email }).select({ password: 0 });
        // console.log(userData);

        //sending the user data as a response to the front end
        res.status(200).json({ userDataFromServer: userData });
    }
    catch (err) {
        console.error(`server error while sending data to the front end : ${err}`);
        // res.status(500).json({ message: "internal server error while while sending data to the front end" })
        const error = {
            errorDetails: "Internal Server Error While sending data to the front end!"
        };
        next(error);
    }
};
//exporting controllers(named exports)
module.exports = { contact, getUserData };