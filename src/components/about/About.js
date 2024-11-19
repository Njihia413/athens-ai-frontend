import React, {useState} from "react";
import GuestHeader from "../common/GuestHeader";
import {Helmet} from "react-helmet";
import AboutImg from "../../assets/img/AboutImg.png";

const About = () => {
    const [menu, setMenu] = useState(false)

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    return (
        <>
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <GuestHeader onMenuClick={() => toggleMobileMenu()}/>
                <div className="page-wrapper">
                    <Helmet>
                        <title>About - Athens AI</title>
                        <meta name="description" content="Chat"/>
                    </Helmet>

                    <div className="content container-fluid">
                        <div className="row">
                            <div className="col-lg-6">
                                <img src={AboutImg} alt="About"/>
                            </div>

                            <div className="col-lg-6">
                                <div className="about-text">
                                    <h3 className="mt-5 text-primary">About Us</h3>
                                    <p>
                                        Our primary focus is simplifying information retrieval through the power of
                                        Generative AI and chat interfaces. We enable users to effortlessly access
                                        comprehensive information by merely asking questions.
                                    </p>

                                    <h3 className="mt-5 text-primary">Our Vision</h3>
                                    <p>
                                        In our vision of the future, we see a world where the power to access profound insights, secure comprehensive answers, and effortlessly generate in-depth reports resides right at your fingertips. We've designed our platform to serve a multitude of roles and purposes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
