// creating a component which provides "context" throughout our whole app
import { createContext, useContext } from "react"
import { useState } from 'react';

// toastify library imports
import { toast } from 'react-toastify';

// first we initialize the create context api's object
const context = createContext();

// wrap the main app compnent in this context provider component and the children would be that app component and we did so so that the context is available throughout the  app
export const ContextProvider = ({ children }) => {
    // contexts

    // function to store the jwt token in the local storage
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

    const storeJwtInLs = (jwt) => {
        // now storing the recieved token from the server in the frontend during login in the local storage
        localStorage.setItem("jwt", jwt);

        //after setting the jwt token in the local storage we create a state and use that token here in this ContextProvider function which would be later used in other functionalites
        // jwt will also be used to toggle login+register or logout button after the user has logged in
        setJwt(jwt);
    };

    let isLoggedIn = jwt;

    // logout functionality
    // const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const logout = () => {
        setJwt("");
        localStorage.removeItem("jwt");
        toast.success("Logged Out successfully!");
    };

    //getting user data from backend after authenticating that the logged in user is the right one
    const [user, setUser] = useState("");

    const getUserData = async () => {
        try {
            // we make a get request to the server to get the user data and we provide the jwt token from the front end which is stored in the local storage after successful login
            const serverResponse = await fetch("http://localhost:8000/form/getUserData", {
                method: "GET",
                headers: {
                    Authorization: `${jwt}`
                }
            });

            // parsing the user data sent from the back end
            const userData = await serverResponse.json();

            // setting this user data in a state and then passing it as a context
            setUser(userData.userDataFromServer);
        } catch (error) {
            alert(`error while fetching data from the backend!\nerror:${error}`);
        }

    };

    return (
        // now we create a provider of context using the object of "createContext" api
        <context.Provider value={{ storeJwtInLs, logout, getUserData, user, isLoggedIn, jwt }}>
            {children}
        </context.Provider>

    )
};

// we also create a custom hook which we can use to get that context provider by the "provider" of create context api
export const useContextCustom = () => {
    return useContext(context);
};


