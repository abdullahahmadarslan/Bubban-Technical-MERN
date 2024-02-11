import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// toastify library imports
import { toast } from 'react-toastify';

export const Register = () => {

    // use useState hook to store and update form data
    const [regData, updateRegData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    // handling the change in the input fields of the registration form
    const regInputChange = (eventObj) => {

        //getting name and value of the input field on which we are currently on
        const name = eventObj.target.name;
        const value = eventObj.target.value;

        //updating the specific field data while we keep the rest of registration fields data as it is
        updateRegData({
            ...regData,
            [name]: value,
        });
    };
    //handling form submit event
    // we send data from front end to backend from here

    //useNavigate hook
    const navigate = useNavigate();

    const handleSubmit = async (eventObj) => {
        try {
            // preventing default behaviour of form submit
            eventObj.preventDefault();

            // now sending a post request using fetch api to the backend
            const serverResponse = await fetch("http://localhost:8000/auth/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(regData) //sending JSON data to the backend which is parsed there
            });

            // console.log(serverResponse);
            // if we got a response from server then we its a success
            // first parsing server response to the one we get in postman
            const parsedServerRespone = await serverResponse.json();
            // console.log(parsedServerRespone);
            if (serverResponse.ok) {
                // then we clear the state of the data and the fields on the ui
                updateRegData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                });

                //then we navigate to the login page using useNavigate hook
                navigate("/login");

                // at last we alert the user that we registered successfully
                toast.success("Registered Successfully!");
            } else {
                toast.error(parsedServerRespone.errorDetails ? parsedServerRespone.errorDetails : parsedServerRespone.message);
            }

        } catch (error) {
            alert(`error while registration : ${error}`);
        }

    };


    return (
        <>
            <div className="reg-main">
                {/* left side*/}
                <div className="reg-left">
                    <div className="reg-img">
                        <img src="public/images/reg.png" alt="reg image" />
                    </div>
                </div>
                {/* right side */}
                <div className="reg-right">
                    <label htmlFor="name"><h1 className="reg-heading">Registration:</h1></label>
                    <form onSubmit={handleSubmit}>
                        {/* name */}
                        <div className="reg-name">
                            <label htmlFor="name">Name </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Your Name Here..."
                                required
                                value={regData.name}
                                onChange={regInputChange}
                                autoComplete="off"
                            />
                        </div>
                        {/* email */}
                        <div className="reg-email">
                            <label htmlFor="email">Email </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Here..."
                                required
                                value={regData.email}
                                onChange={regInputChange}
                                autoComplete="off"
                            />
                        </div>
                        {/* phone */}
                        <div className="reg-phone">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                placeholder="Enter Your Phone Here..."
                                required
                                value={regData.phone}
                                onChange={regInputChange}
                                autoComplete="off"
                                inputmode="numeric"
                            />
                        </div>
                        {/* password */}
                        <div className="reg-password">
                            <label htmlFor="password">Password </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Your Password Here..."
                                required
                                value={regData.password}
                                onChange={regInputChange}
                                autoComplete="off"
                            />
                        </div>
                        {/* submit button */}
                        <button className="reg-btn" type="submit">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
