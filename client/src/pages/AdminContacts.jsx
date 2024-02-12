import { useEffect, useState } from 'react';

// importing the custom context api to get the contexts of the context provider
import { useContextCustom } from "../context/ContextProvider";

import { toast } from 'react-toastify';

export const AdminContacts = () => {

    const { jwt } = useContextCustom();

    // making a getContacts request to the backend
    const [contactsArray, setContactsArray] = useState([]);

    const getContacts = async () => {
        try {
            const serverResponse = await fetch("http://localhost:8000/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: `${jwt}`
                }
            })

            if (serverResponse.ok) {
                // taking the contacts array from the parsed response of backend
                const parsedServerResponse = await serverResponse.json()
                // storing this array data in a state variable of array
                setContactsArray(parsedServerResponse.allContactsData);
            } else {
                toast.error(`Error While Getting Contacts From The Server`);
            }
        } catch (error) {
            console.log(`error while getting contacts from the backend. error:${error}`);
        }
    };

    // make a get request to the backend to get the contacts data from the backend when the page is first rendered
    useEffect(() => {
        if (jwt) {
            getContacts();
        }
    }, []);
    return (
        <table className='admin-contacts'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {
                    contactsArray && contactsArray.map((currentContact, index) => {
                        {/* destructuring the current Contact */ }
                        const { name, email, phone, message } = currentContact;

                        {/* returning rows of the table with data */ }
                        return (
                            <tr key={index}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{message}</td>
                            </tr>)

                    })
                }
            </tbody>
        </table>

    )
};
