import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// importing the custom context api to get the contexts of the context provider
import { useContextCustom } from "../context/ContextProvider";

// toastify library imports
import { toast } from 'react-toastify';

export const Contact = () => {

    // using the custom use context api to get the function to get the user data after the initial render of the "Contact" component
    const { getUserData, user } = useContextCustom();

    // when the page is first rendered then this method is called after all the statements of the 'Contact' page are executed
    const [set, setSetted] = useState(true);
    useEffect(() => {
        getUserData();
        // if we got some data in the userData which is not falsy then we set data some data by deafault when user is logged in
        if (user && set) {
            updateContactusData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                message: ""
            });

            // setted state
            setSetted(false);
        }
    }, [getUserData, user]);
    // use useState hook to store and update form data
    const [contactusData, updateContactusData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });


    // handling the change in the input fields of the contact us form
    const contactusInputChange = (eventObj) => {

        //getting name and value of the input field on which we are currently on
        const name = eventObj.target.name;
        const value = eventObj.target.value;

        //updating the specific field data while we keep the rest of contact us fields data as it is
        updateContactusData({
            ...contactusData,
            [name]: value,
        });
    };
    // handling contact form submit

    // use navigate hook
    const navigate = useNavigate();
    const handleSubmit = async (eventObj) => {
        try {
            // first preventing the default behaviour of the form submit event
            eventObj.preventDefault();

            // now making a post req using fetch api to the backend server
            const serverResponse = await fetch("http://localhost:8000/form/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contactusData)
            });

            // if we get an ok response from the server 
            // first parsing server response to the one we get in postman
            const parsedServerRespone = await serverResponse.json();
            if (serverResponse.ok) {
                // clearing the input fields
                updateContactusData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });

                // alerting the user
                toast.success("Your Response Has Been Recorded.\nThank You!");

                //redirecting the user to the home page
                navigate("/");
            } else {
                toast.error(parsedServerRespone.errorDetails ? parsedServerRespone.errorDetails : parsedServerRespone.message);
            }
        } catch (error) {
            alert(`error while sending message: ${error}`);
        }
    };

    return (
        <>
            <div className="contact-main">
                {/* left side*/}
                <div className="contact-left">
                    <div className="contact-img">
                        <img src="public/images/contact.png" alt="contact image" />
                    </div>
                </div>
                {/* right side */}
                <div className="contact-right">
                    <form onSubmit={handleSubmit}>
                        {/* name */}
                        <div className="contact-name">
                            <label htmlFor="name">Name </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Your Name Here..."
                                required
                                onChange={contactusInputChange}
                                value={contactusData.name}
                            />
                        </div>
                        {/* email */}
                        <div className="contact-email">
                            <label htmlFor="email">Email </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Here..."
                                required
                                onChange={contactusInputChange}
                                value={contactusData.email}
                            />
                        </div>
                        {/* phone */}
                        <div className="contact-phone">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                placeholder="Enter Your Phone Here..."
                                required
                                onChange={contactusInputChange}
                                value={contactusData.phone}
                            />
                        </div>
                        {/* message */}
                        <div className="contact-message">
                            <label htmlFor="message">Message </label>
                            <textarea
                                name="message"
                                id="message"
                                cols="30"
                                rows="10"
                                placeholder="Enter Your Message Here..."
                                required
                                onChange={contactusInputChange}
                                value={contactusData.message}
                            />
                        </div>
                        {/* submit button */}
                        <button className="contact-btn" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
