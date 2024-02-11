//importing navlink
import { NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';

// importing the custom context api to get the contexts of the context provider
import { useContextCustom } from "../context/ContextProvider";




export const Navbarr = () => {
    // destructuring the jwt token from the custom use context hook
    const { isLoggedIn, getUserData, user, jwt } = useContextCustom();

    // doing a request to get user that so that i can write the logic to present an admin button if the user is an admin
    useEffect(() => {
        getUserData();
    }, [user, jwt]);

    return (
        <>
            <div className="nav-main">
                {/* logo */}
                <div className="nav-left">
                    <Link className="nav-logo-main" to="/"><p className="nav-logo">BUBBAN TECHNICAL</p></Link>
                </div>
                {/* list items */}
                <div className="nav-right">
                    <ul>
                        <li>
                            <NavLink to="/" >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="about" >About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" >Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" >Contact</NavLink>
                        </li>

                        {/* the jwt has some string value after login which is truthy, otherwise in case of logout or no login it has "" empty string which is considered a falsy */}
                        {/* we render login+register if logged out else a logout button if logged in */}
                        {
                            isLoggedIn ?
                                <li>
                                    <NavLink to="/logout" >Logout</NavLink>
                                </li>
                                :
                                <>
                                    <li>
                                        <NavLink to="/login" >Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register" >Register</NavLink>
                                    </li>
                                </>
                        }

                        {/* if you want to display an Admin Option if the user is an admin */}
                        {
                            user && user.isAdmin ?
                                <li>
                                    <NavLink to="/admin" >Admin Panel</NavLink>
                                </li>
                                :
                                <></>

                        }
                    </ul>
                </div>
            </div>
        </>
    );
}
