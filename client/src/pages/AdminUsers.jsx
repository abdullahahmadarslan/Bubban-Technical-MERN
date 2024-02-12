import { useEffect, useState } from "react";
import { useContextCustom } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminUsers = () => {
    // importing the custom context api to get the contexts of the context provider
    const { jwt } = useContextCustom();

    // getting user data from the backend
    const [usersArray, setUsersArray] = useState([]);
    const getUsers = async () => {
        try {
            // getting server Response on the getUsers request and we pass the jwt alongwith for authentication of admin
            const serverResponse = await fetch("http://localhost:8000/admin/user", {
                method: "GET",
                headers: {
                    Authorization: `${jwt}`,
                },
            });
            const parsedServerResponse = await serverResponse.json();
            // extracting users array from the parsed server response
            const allUsersArray = parsedServerResponse.allUsersData;
            // console.log(allUsersArray);
            // after getting the data from backend, we store it in an array state variable
            setUsersArray(allUsersArray);
        } catch (error) {
            alert(`error while fetching user data from backend.\nerror:${error}`);
        }
    };

    // deleting the user from database when delete button is pressed
    const deleteUser = async (userId) => {
        try {
            // doing a delete request to the server
            const serverResponse = await fetch(
                `http://localhost:8000/admin/user/delete/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `${jwt}`
                    }
                }
            );

            // parsing server response
            // console.log(serverResponse);
            // const parsedServerResponse = await serverResponse.json();
            if (serverResponse.status === 200) {
                toast.success(`User with Id:${userId} Deleted Successfully!`);
                getUsers();
            } else {
                toast.error(`User with Id:${userId} Not Found!`);
            }
        } catch (error) {
            console.log("Error While deleting user from the database");
        }
    };

    // getting users data from the backend whenever the page is rendered initially rendered
    useEffect(() => {
        // Check if jwt is available
        if (jwt) {
            // Call getUsers only when jwt is available
            getUsers();
        }
    }, [jwt]);

    return (
        <>
            <table className="admin-users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {usersArray && usersArray.map((currentUser, index) => {
                        {
                            /* first we destructure the data out of the currentUser i.e. the index of usersArray */
                        }
                        const { name, email, phone } = currentUser;

                        {
                            /*then returning rows of table for each user data  */
                        }
                        return (
                            <tr key={index}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>
                                    <Link to={`${currentUser._id}/edit`}>
                                        <button className="admin-users-updatebtn">Update</button>
                                    </Link>
                                </td>
                                <td>
                                    <button className="admin-users-deletebtn"
                                        onClick={() => {
                                            deleteUser(currentUser._id);
                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
