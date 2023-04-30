import {Fragment} from "react";
import {useLocation} from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Contact = () => {
    let {pathname} = useLocation();

    return (
        <Fragment>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        {label: "Home", path: process.env.PUBLIC_URL + "/"},
                        {label: "Add new blog", path: process.env.PUBLIC_URL + pathname}
                    ]}
                />
                <div>
                    <div className="container">
                        <div className="custom-row-2">
                            <div className="col-12 col-lg-4 col-md-5">
                                <div className="contact-info-wrap">
                                    <div className="single-contact-info">
                                        <div className="contact-icon">
                                            <i className="fa fa-phone"/>
                                        </div>
                                        <div className="contact-info-dec">
                                            <p>+012 345 678 102</p>
                                            <p>+012 345 678 102</p>
                                        </div>
                                    </div>
                                    <div className="single-contact-info">
                                        <div className="contact-icon">
                                            <i className="fa fa-globe"/>
                                        </div>
                                        <div className="contact-info-dec">
                                            <p>
                                                <a href="#!">
                                                    yourname@email.com
                                                </a>
                                            </p>
                                            <p>
                                                <a href="#!">
                                                    yourwebsitename.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="single-contact-info">

                                        <div className="contact-info-dec">
                                            <p>Address goes here, </p>
                                            <p>street, Crossroad 123.</p>
                                        </div>
                                    </div>
                                    <div className="contact-social text-center">
                                        <h3>Follow Us</h3>
                                        <ul>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-facebook"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-pinterest-p"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-tumblr"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-vimeo"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-twitter"/>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-8 col-md-7">
                                <div className="contact-form">
                                    <div className="contact-title mb-30">
                                        <h2>Add a new blog here ...</h2>
                                    </div>
                                    <form className="contact-form-style">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <input name="title" placeholder="title*" type="text"/>
                                            </div>
                                            <div className="col-lg-12">
                                                <input
                                                    name="description"
                                                    placeholder="description*"
                                                    type="text"
                                                />
                                            </div>
                                            <div className="col-lg-12">
                        <textarea
                            name="body"
                            placeholder="Your Blog body*"
                            defaultValue={""}
                        />
                                                <hr/>
                                                <div className="col-lg-12">
                                                    <input name="image" type="file"/>
                                                </div>
                                                <button className="submit" type="submit">
                                                    SEND
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="form-message"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default Contact;
