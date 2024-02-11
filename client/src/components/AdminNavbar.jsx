import { NavLink, Outlet } from "react-router-dom"
import { FaUser } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";

export const AdminNavbar = () => {
    return (
        <>
            <div className="admin-nav">
                {/* left */}
                <div className="admin-nav-left">
                    <ul>
                        <li>
                            <NavLink to="/admin/users" >
                                <div>
                                    <FaUser />
                                </div>
                                <div>User</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contacts" >
                                <div>
                                    <IoMdContacts style={{ fontSize: '30px' }} />
                                </div>
                                <div>Contacts</div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {/* right */}
                <div className="admin-nav-right">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
