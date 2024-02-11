const express = require("express");

//creating instance of servicesRouter class
const servicesRouter = express.Router();

// importing services controllers
const servicesController = require("../controllers/services-controller");

// defining routes
servicesRouter.route("/services").get(servicesController.services);

// exporting the services router
module.exports = servicesRouter;