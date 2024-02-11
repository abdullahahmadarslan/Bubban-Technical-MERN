import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

// importing the custom context api to get the contexts of the context provider
import { useContextCustom } from "../context/ContextProvider";

// toastify library imports
import { toast } from 'react-toastify';

export const AdminUsersEdit = () => {
    const { jwt } = useContextCustom();
    // use useState hook to store and update form data
    const [updatedData, setUpdatedData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // handling the change in the input fields of the update form
    const regInputChange = (eventObj) => {

        //getting name and value of the input field on which we are currently on
        const name = eventObj.target.name;
        const value = eventObj.target.value;

        //updating the specific field data while we keep the rest of fields data as it is
        setUpdatedData({
            ...updatedData,
            [name]: value,
        });
    };
    //handling form submit event
    // we send data from front end to backend from here

    //useNavigate hook
    const navigate = useNavigate();
    const { userId } = useParams();

    const handleSubmit = async (eventObj) => {
        try {
            // preventing default behaviour of form submit
            eventObj.preventDefault();

            // now sending a post request using fetch api to the backend
            const serverResponse = await fetch(`http://localhost:8000/admin/user/update/${userId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `${jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData) //sending JSON data to the backend which is parsed there
            });

            // console.log(serverResponse);
            // if we got a response from server then we its a success
            // first parsing server response to the one we get in postman
            const parsedServerRespone = await serverResponse.json();
            // console.log(parsedServerRespone);
            if (serverResponse.ok) {
                // then we clear the state of the data and the fields on the ui
                setUpdatedData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                });

                //then we navigate to the login page using useNavigate hook
                navigate("/admin/users");

                // at last we alert the user that we registered successfully
                toast.success(`User with Id:${userId} Update Successfully!`);
            } else {
                toast.error(parsedServerRespone.errorDetails ? parsedServerRespone.errorDetails : parsedServerRespone.message);
            }

        } catch (error) {
            alert(`error while registration : ${error}`);
        }

    };

    return (
        <>
            <>
                <div className="update-main">
                    {/* right side */}
                    <div className="update-right">
                        <form onSubmit={handleSubmit}>
                            {/* name */}
                            <div className="update-name">
                                <label htmlFor="name">Name </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter New Name Here..."
                                    required
                                    value={updatedData.name}
                                    onChange={regInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            {/* email */}
                            <div className="update-email">
                                <label htmlFor="email">Email </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter New Email Here..."
                                    required
                                    value={updatedData.email}
                                    onChange={regInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            {/* phone */}
                            <div className="update-phone">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter New Phone Here..."
                                    required
                                    value={updatedData.phone}
                                    onChange={regInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            {/* submit button */}
                            <button className="update-btn" type="submit">
                                Update
                            </button>
                            <br />
                            <div className="admin-update-text">
                                <h4>Don't wanna update?</h4><Link to="/admin/users" >Go Back</Link>

                            </div>
                        </form>
                    </div>
                </div>
            </>
        </>
    );
};
