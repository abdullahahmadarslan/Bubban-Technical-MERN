//requiring model of db
const authModel = require("../models/auth-model");

// checks whether the logged in user is admin or not
const adminValidator = async (req, res, next) => {
    try {
        // after we got passed from the jwt authentication and we confirmed that the user is logged in we check that wether the user is an admin or not, if he is then we pass the data to the front end
        // console.log(`${req.userData}`);
        const { email } = req.userData;
        const user = await authModel.findOne({ email: email });
        const { isAdmin } = user;

        //if the user is not admin then we dont return the data to the front end
        if (!isAdmin) {
            return res.status(403).json({ message: "Access Denied.\nMake Sure You are Admin!" });
        } else {
            // else moving to the controller logic
            next();
        }

        // passing the control on to the next middleware 
    } catch (err) {
        console.log(`server error while checking admin or not. error:${err}`);
        const error = {
            errorDetails: "server error while checking admin or not"
        };
        next(error);
    }

};

// exporting admin validator middleware
module.exports = adminValidator;