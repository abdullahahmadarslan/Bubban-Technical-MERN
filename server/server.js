//requiring .env file at the top
require("dotenv").config();

//creating express app
const express = require("express");
const app = express();

//requiring routers
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const servicesRouter = require("./router/services-router");
const adminRouter = require("./router/admin-router");

//requiring database connection
const dbConnection = require("./utils/db");

//requiring error middleware function
const errorMiddleware = require("./middlewares/error-middleware");

//requiring cors 
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "POST,GET,PUT,PATCH,DELETE",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type']
}


//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/form", contactRouter);
app.use("/data", servicesRouter);
app.use("/admin", adminRouter);
app.use(errorMiddleware);

//listening the app on a port provided by the environment i.e. app only listens if the connection to the database is successful
dbConnection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server listening on the port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`error connecting to the database! error: ${err}`);
    });
