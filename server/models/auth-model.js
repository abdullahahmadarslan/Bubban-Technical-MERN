//requiring mongoose
const mongoose = require("mongoose");

//requiring bcryptjs js library
const bcryptjs = require("bcryptjs");

//requiring jwt js library
const jwt = require("jsonwebtoken");

//creating schema i.e. document structure of the database
const authSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// middlware functions

//defining middleware function on the schema so that we perform password hashing before the document gets saved in the database
authSchema.pre("save", async function (next) {
    try {
        //this keyword gives the document which was to be saved or inserted in the database
        // console.log(this);
        const documentInstance = this;

        //if the password field gets modified, we hash the password before saving it
        //is modified is a mongoose document instance method
        if (documentInstance.isModified("password")) {
            let saltRounds = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(this.password, saltRounds);

            //after creating a hashed password we override it with the current document to be saved password
            this.password = hashedPassword;
        }

        //after this "save" middle ware function we pass the control on to the next middleware function or the actual operation "save" i.e. saving the document if no other middleware function found
        next();
    } catch (error) {
        console.error(`error while hashing password: ${error}`);
        next(error);
    }
});

//document instance methods

//we can define document instance methods on the schema.methods object and use them for any document instance of our database

//generating a jwt token whenever a user registers
authSchema.methods.genJwtToken = async function () {
    try {
        // console.log('Generating JWT token for user:', this.email);

        const token = jwt.sign(
            {
                id: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SEC_KEY,
            {
                expiresIn: "1h",
            }
        );

        // console.log('Generated JWT token:', token);
        return token;
    } catch (error) {
        console.error(`Error while generating token: ${error}`);
        next(error);
    }
};

//password authentication
authSchema.methods.passwordAuth = async function (clientPassword) {
    try {
        return bcryptjs.compare(clientPassword, this.password);

    } catch (error) {
        console.error(`error while password authentication: ${error}`)
        next(error);

    }
}
//creating model using schema
const authModel = mongoose.model("Auth", authSchema);

//exporting model
module.exports = authModel;
