import { Link } from 'react-router-dom';


export const Homee = () => {
    return (
        <div className="home-main">
            <div className="home-left-right">
                {/* left */}
                <div className="home-left">
                    <h3 className="home-intro home-txt">We are the world best it company</h3>
                    <h1 className="home-welcome home-txt">
                        welcome to, <p>Bubban Technical</p>
                    </h1>
                    <p className="home-description home-txt">
                        Empowering businesses through cutting-edge technology solutions, our
                        IT company specializes in providing comprehensive services tailored to
                        your unique needs. From innovative software development and robust
                        cybersecurity solutions to seamless cloud integration and expert IT
                        consulting, we prioritize efficiency, reliability, and client
                        satisfaction. With a team of seasoned professionals, we are dedicated
                        to delivering top-notch services that propel your business forward in
                        the ever-evolving digital landscape
                    </p>
                    <div className="home-buttons">
                        <Link to="/contact"><button className="homebtn1">Connect Now</button></Link>
                        <Link to="/register"><button className="homebtn2">Register </button></Link>
                    </div>
                </div>
                {/* right */}
                <div className="home-right">
                    <img src="public/images/home.png" alt="" className="home-img" />
                </div>
            </div>
        </div>
    );
};
