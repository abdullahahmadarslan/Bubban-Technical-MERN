const express = require("express");

//creating instance of authRouter class
const authRouter = express.Router();

//importing controllers
const authControllers = require("../controllers/auth-controller");

//importing zod schemas
const regZodSchema = require("../zod-schema/reg-schema.js");
const loginZodSchema = require("../zod-schema/login-schema");

//importing the middleware function for validation of reg and login
const authValidator = require("../middlewares/auth-validator.js")

//defining routes on the instance

//home route
authRouter.route("/").get(authControllers.home);

//registration route
//a middleware is used here for registration fields validations using zod
authRouter.route("/registration").post(authValidator(regZodSchema), authControllers.registration);

//login route
//a middleware is used here for login fields validations using zod
authRouter.route("/login").post(authValidator(loginZodSchema), authControllers.login);

//exporting authRouter
module.exports = authRouter;
