//creating controllers following MVC software architecture

//requiring model of db
const authModel = require("../models/auth-model");

//requiring bcrypt js library
const bcryptjs = require("bcryptjs");

//home controller
const home = async (req, res, next) => {
    try {
        res.status(200).json({ message: "home" });
    } catch (error) {
        res.status(400).json({ message: "home not found" });
    }
};

//registration controller
const registration = async (req, res) => {
    try {
        //destructuring data from request body of the client side post request
        const { name, email, phone, password } = req.body;

        //performing validation based on email using model
        const emailExists = await authModel.findOne({ email: email }); //we can also do {email} only as key and value same
        if (emailExists) {
            res.status(401).json({ message: "email already exists in the database" });
            console.error("email already exists");
        } else {
            //saving the document to the database if no error
            const dbDocument = await authModel.create({
                email,
                name,
                phone,
                password,
            });
            res.status(201).json({
                message: `user registered with data: ${dbDocument}`,
                jwt: await dbDocument.genJwtToken(),
                userId: dbDocument._id,
            });
        }
    } catch (err) {
        console.error(`server error while registration: ${err}`);
        // res.status(500).json({ message: "internal server error while registration" });
        const error = {
            errorDetails: "Internal Server Error While Registration!"
        };
        next(error);
    }
};

//login controller
const login = async (req, res, next) => {
    try {
        //first destructuring the request body from client side
        const { email, password } = req.body;

        //now performing email and password validation
        //first authenticating email
        const documentInstance = await authModel.findOne({ email: email });
        if (!documentInstance) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        //if email found then we move on to the password authentication
        const passwordExists = await documentInstance.passwordAuth(password);
        if (!passwordExists) {
            return res.status(401).json({ message: "Invalid Password" });
        } else {
            res
                .status(200)
                .json(
                    {
                        message: "user successfully authenticated and logged in",
                        jwt: await documentInstance.genJwtToken()
                    },
                );
        }
    } catch (err) {
        console.error(`server error while login : ${err}`);
        // res.status(500).json({ message: "internal server error while login" })
        const error = {
            errorDetails: "Internal Server Error While Login!"
        };
        next(error);
    }
};

//exporting controllers(named exports)
module.exports = { home, registration, login };
