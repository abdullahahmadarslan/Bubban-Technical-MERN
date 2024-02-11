//creating validation middleware function for the zod schema we created and this validation is performed before we move to the mongoose schema and model
const authValidator = (authZodSchema) => async (req, res, next) => {
    try {
        // The parseAsync method you're referring to is part of the Zod library, specifically used for parsing and validating data asynchronously against a defined schema.
        const parsedData = await authZodSchema.parseAsync(req.body);

        //if validation is ok then we get the document which the user is inserting in the 'data' and we call the next middleware in the chain or if not any then back to the registration route further
        next();

    } catch (err) {
        console.error(`error while zod validation: ${err}`);
        // res.status(501).json({ message: `error while performing validation using zod, make sure the fields are filled properly according to the requirements!` });

        // console.log(err.errors[0].message);

        const error = {
            errorDetails: err.errors[0].message
        };
        // passing the error to the error middlewares
        next(error);
    }

};

//exporting this middleware function to be used in the routes section
module.exports = authValidator;