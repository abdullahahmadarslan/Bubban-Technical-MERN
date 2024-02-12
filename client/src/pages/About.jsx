import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

// importing the custom context api to get the contexts of the context provider
import { useContextCustom } from "../context/ContextProvider";


export const About = () => {
    const { user, getUserData } = useContextCustom();

    // 
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>

            <div className="aboutus-main">
                {/* left side */}
                <div className="aboutus-left">
                    <h2>Welcome,<p> {user ? user.name : "Guest"}</p></h2>
                    <h1>Why Choose Us?</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
                        blanditiis totam omnis rerum itaque culpa, dolorum tenetur odit
                        suscipit autem, sunt officiis quibusdam! Nobis consequuntur illum,
                        repellat ab voluptatibus ipsam, nam vero maxime eos nihil illo sit
                        sequi eum distinctio porro placeat animi dolor doloribus at
                        voluptate. Qui, aperiam voluptatum.
                    </p>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
                        assumenda, sapiente nesciunt voluptatem sunt illum enim dignissimos
                        corporis architecto hic recusandae repellendus. Illum inventore
                        mollitia obcaecati eius soluta consequuntur sed.
                    </p>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
                        optio magnam excepturi sint illum. Similique, quas recusandae! Aut
                        quas aliquam voluptate ut officiis vero minus cum corrupti assumenda
                        aliquid! Explicabo.
                    </p>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
                        optio magnam excepturi sint illum. Similique, quas recusandae! Aut
                        quas aliquam voluptate ut officiis vero minus cum corrupti assumenda
                        aliquid! Explicabo.
                    </p>
                    <br />

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
                        optio magnam excepturi sint illum. Similique, quas recusandae! Aut
                        quas aliquam voluptate ut officiis vero minus cum corrupti assumenda
                        aliquid! Explicabo.
                    </p>
                    <br />
                    <br />
                    <NavLink to="/contact" className="aboutusbtn-1">Connect Now</NavLink>
                    <NavLink to="/services" className="aboutusbtn-2">Learn More</NavLink>
                </div>
                {/* right side */}
                <div className="aboutus-right">
                    <div className="aboutus-img">
                        <img src="public/images/aboutus.png" alt="aboutus image" />
                    </div>
                </div>
            </div>

        </>
    );
};
