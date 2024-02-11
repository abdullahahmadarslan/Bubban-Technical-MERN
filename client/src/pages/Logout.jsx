// importing the custom context api to get the contexts of the context provider
import { useNavigate } from "react-router-dom";
import { useContextCustom } from "../context/ContextProvider";
import { useEffect } from 'react';


export const Logout = () => {
    // destructuring the logout function 
    const { logout } = useContextCustom();

    // using the useNavigate hook
    const navigate = useNavigate();

    useEffect(() => {
        // logging out the useer by removing its jwt token as soon as we click on the logout button in the navbar
        logout();

        // after logging out we redirect the user to the login page
        navigate('/login');
    }, []);



}
