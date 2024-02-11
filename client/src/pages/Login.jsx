import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

// toastify library imports
import { toast } from 'react-toastify';


// importing the custom context api to get the contexts of the context provider
import { useContextCustom } from "../context/ContextProvider";

export const Login = () => {
    // use useState hook to store and update form data
    const [loginData, updateLoginData] = useState({
        email: "",
        password: "",
    });

    // handling the change in the input fields of the login form
    const loginInputChange = (eventObj) => {
        //getting name and value of the input field on which we are currently on
        const name = eventObj.target.name;
        const value = eventObj.target.value;

        //updating the specific field data while we keep the rest of login fields data as it is
        updateLoginData({
            ...loginData,
            [name]: value,
        });
    };

    //handling form submit event
    // we send data from front end to backend from here

    //useNavigate hook
    const navigate = useNavigate();

    // using the custom use context api to get the function to store jwt in local storage
    const { storeJwtInLs } = useContextCustom();

    const handleSubmit = async (eventObj) => {
        try {
            // preventing default behaviour of form submit
            eventObj.preventDefault();

            // now sending a post request using fetch api to the backend
            const serverResponse = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData) //sending JSON data to the backend which is parsed there
            });
            // if we got a response from server then we its a success
            // first parsing server response to the one we get in postman
            const parsedServerRespone = await serverResponse.json();
            // console.log(parsedServerRespone);
            if (serverResponse.ok) {
                // now setting the jwt token sent by the server on login by us in the local storage which will be later used for authentication
                storeJwtInLs(parsedServerRespone.jwt);

                // then we clear the state of the data and the fields on the ui
                updateLoginData({
                    email: "",
                    password: "",
                });

                //then we navigate to the home page using useNavigate hook
                navigate("/");

                //at last we alert the user that we registered successfully
                toast.success("Login Successful!");
            } else {
                toast.error(parsedServerRespone.errorDetails ? parsedServerRespone.errorDetails : parsedServerRespone.message);
            }
        } catch (error) {
            alert(`error while login: ${error}`);
        }
    }
    return (
        <>
            <div className="login-main">
                {/* left side*/}
                <div className="login-left">
                    <div className="login-img">
                        <img src="public/images/login.png" alt="login image" />
                    </div>
                </div>
                {/* right side */}

                <div className="login-right">
                    <label htmlFor="email"><h1 className="login-heading">Login: </h1></label>
                    <form onSubmit={handleSubmit}>
                        {/* email */}
                        <div className="login-email">
                            <label htmlFor="email">Email </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Here..."
                                required
                                value={loginData.email}
                                onChange={loginInputChange}
                                autoComplete="off"
                            />
                        </div>
                        {/* password */}
                        <div className="login-password">
                            <label htmlFor="password">Password </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Your Password Here..."
                                required
                                value={loginData.password}
                                onChange={loginInputChange}
                                autoComplete="off"
                            />
                        </div>
                        {/* submit button */}
                        <button className="login-btn" type="submit">
                            Login
                        </button>
                        <p className="login-text">Don't have an account? <Link className="login-register" to="/register">Register</Link></p>
                    </form>
                </div>
            </div>
        </>
    );
};
