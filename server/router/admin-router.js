const express = require("express");

//creating instance of authRouter class
const adminRouter = express.Router();

//importing controllers
const adminController = require("../controllers/admin-controller");

//importing the middleware functions for authentication of admin
const getUserDataMiddleware = require("../middlewares/getuserdata-middleware.js")
const adminValidator = require("../middlewares/admin-validator.js");

//defining routes on the instance

// user routes
// get users
adminRouter.route("/user").get(getUserDataMiddleware, adminValidator, adminController.getUsers);
// delete a user from data base on basis of user id from the front end
adminRouter.route("/user/delete/:id").delete(getUserDataMiddleware, adminValidator, adminController.deleteUser);
// update a user in data base on basis of data sent from the front end form body and the id sent from the front end
adminRouter.route("/user/update/:id").patch(getUserDataMiddleware, adminValidator, adminController.updateUser);


// contacts routes
adminRouter.route("/contacts").get(getUserDataMiddleware, adminValidator, adminController.getContacts);

// exporting the admin router
module.exports = adminRouter;
