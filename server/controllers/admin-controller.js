//requiring model of db
const authModel = require("../models/auth-model");
const contactModel = require("../models/contact-model");

// user controllers
// getUsers controller
const getUsers = async (req, res, next) => {
    try {
        // after ensuring that the logged in user is the admin we send the users data to the front end
        const allUsersData = await authModel.find();
        res.status(200).json({ allUsersData });
        // passing the control on to the next middleware
    } catch (err) {
        console.log(
            `server error while sending the user data to the admin panel. error: ${err}`
        );
        const error = {
            errorDetails:
                "server error while sending the user data to the admin panel",
        };
        next(error);
    }
};

// delete a user on basis of id
const deleteUser = async (req, res, next) => {
    try {
        // getting the id from the front end using the url 
        const userId = req.params.id;

        //after getting id we search from data base and delete that one user
        const deleteInfo = await authModel.deleteOne({ _id: userId });
        if (deleteInfo.deletedCount === 0) {
            res.status(404).json({ message: `User With Id:${userId} Not Found!` })
        } else {
            res.status(200).json({ message: "User Deleted Successfully!" });
        }
    } catch (err) {
        console.log(
            `server error while deleting user from the database. error: ${err}`
        );
        const error = {
            errorDetails:
                "server error while while deleting user from the database",
        };
        next(error);
    }
};

// update a user on basis of id and data sent from the front end form body
const updateUser = async (req, res, next) => {
    try {
        // first getting the user id from the params and the data from request body of form 
        const userId = req.params.id;
        const userDataToUpdate = req.body;

        //search the user based on id and then update the user with data sent from the front end form body
        const updateInfo = await authModel.updateOne({ _id: userId }, { $set: userDataToUpdate });
        // console.log(updateInfo);
        // if one user is updated
        if (updateInfo.matchedCount === 1) {
            res.status(200).json({ message: `User with Id:${userId} Updated Successfully` });
        }
        else {
            res.status(404).json({ message: `user with Id:${userId} not found!` });
        }
    } catch (err) {
        console.log(
            `server error while updating user from in database. error: ${err}`
        );
        const error = {
            errorDetails:
                "server error while updating user from in database"
        };
        next(error);
    }
};


// contacts controller
// getContacts controller
const getContacts = async (req, res, next) => {
    try {
        // after ensuring that the logged in user is the admin we send the users data to the front end
        const allContactsData = await contactModel.find();
        res.status(200).json({ allContactsData });
        // passing the control on to the next middleware
    } catch (err) {
        console.log(
            `server error while sending the contact data to the admin panel. error: ${err}`
        );
        const error = {
            errorDetails:
                "server error while sending the contact data to the admin panel",
        };
        next(error);
    }
};

// exporting admin controllers
module.exports = { getUsers, getContacts, deleteUser, updateUser };
