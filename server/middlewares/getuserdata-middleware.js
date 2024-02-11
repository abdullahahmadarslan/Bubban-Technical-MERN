//defining the middleware which authenticates the user before sending data to the front end

//requiring jwt js library
const jwt = require("jsonwebtoken");

const getUserDataMiddleware = (req, res, next) => {
    try {
        // firstly we get the jwt sent along with the get request from the front end
        const frontEndJwt = req.header("Authorization");
        // console.log(frontEndJwt);

        //if there was a token recieved from the frontend then we perform authentication
        if (frontEndJwt) {
            const payloadData = jwt.verify(frontEndJwt, process.env.JWT_SEC_KEY);

            // if the token was verified, we got payload data which we populated in req.userData and now we use this in the controller
            req.userData = payloadData;

            //passing the control 
            next();
        } else {
            res.status(401).json({ message: "No Token Sent From The Front End.\nLogin First!" });
            console.error("no token recieved from the front end");
        }



    } catch (error) {
        console.error(`token not verified! error: ${error}`);
        res.status(401).json({ message: "Token Not Verified.\nLogin Again!" });
    }
};

//exporting middleware
module.exports = getUserDataMiddleware;