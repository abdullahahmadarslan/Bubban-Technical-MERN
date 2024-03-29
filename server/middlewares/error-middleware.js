//defining a common error middleware for all internal server errors instead of separately creating error for each internal server error
const errorMiddleware = (error, req, res, next) => {
    res
        .status(500)
        .json({
            message: "internal server error using error middleware",
            errorDetails: error.errorDetails,
        });
};

//exporting the error middleware function and telling the express app to consider it as a middleware using app.use()
module.exports = errorMiddleware;
