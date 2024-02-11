const express = require("express");

//creating instance of contactRouter class
const contactRouter = express.Router();

//importing controllers
const contactController = require("../controllers/contact-controller.js");

//importing zod schemas
const contactSchema = require("../zod-schema/contact-schema");

//importing the middleware function for validation of contact form
const authValidator = require("../middlewares/auth-validator.js")

//importing the middleware function for sending user data to the front end
const getUserDataMiddleware = require("../middlewares/getuserdata-middleware.js")


//defining routes on the instance
//a middleware is used here for contact us fields validations using zod
contactRouter.route("/contact").post(authValidator(contactSchema), contactController.contact);

//get user data route
contactRouter.route("/getUserData").get(getUserDataMiddleware, contactController.getUserData);

//exporting form router
module.exports = contactRouter;
