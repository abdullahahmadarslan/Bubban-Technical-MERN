import { useEffect } from 'react';
import { useState } from 'react';

export const Services = () => {
    // defining the services to get the services from the backend

    const [services, setServices] = useState([]);
    const getServices = async () => {
        try {
            // we make a get req to the backend and fetch all services
            const serverResponse = await fetch("http://localhost:8000/data/services", {
                method: "GET",
            });

            // parsing server response
            const parsedServerResponse = await serverResponse.json();

            // storing the services array in a state variable which is also an array
            // console.log(parsedServerResponse);
            setServices(parsedServerResponse.allServices)

        } catch (error) {
            alert("error while fetching services");
        }
    };

    //we do a getServices request to the backend when the page is first rendered and show all the services present in the database
    useEffect(() => {
        getServices();
    }, []);

    return (
        <div className="services-container">
            {
                services.map((currentService, index) => {
                    {/* destructing services info */ }
                    const { service, description, price, provider } = currentService;

                    {/* returning a service card for each service */ }
                    return (
                        <div className="service-main" key={index}>
                            <div className="service-img">
                                <img src="/public/images/service.jpg" alt="service image" />
                            </div>
                            <div className="service-center">
                                <p>{provider}</p>
                                <p>{price}</p>
                            </div>
                            <div className="service-heading"><h2>{service}</h2></div>
                            <div className="service-description"><p>{description}</p></div>
                        </div>)

                })
            }
        </div>
    );
};
