import React, { useRef } from "react";

const Footer = props => {

    const emailInput = useRef(null);

    const { subscription, onSubscribe, updateSubscriptionState, updateErrorState, errors } = props;

    const is_valid = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleChange = e => {
        updateSubscriptionState({ key: e.target.name, value: e.target.value });
    };

    const handleSubmit = (ev) => {

        if (!subscription.email) {
            updateErrorState({ key: 'email', value: 'email cannot be empty' });
            emailInput.current.focus();
            return false;
        }

        /* if (!is_valid(subscription.email)) {
            updateErrorState({ key: 'email', value: 'email is invalid' });
            emailInput.current.focus();
            return false;
        } */

        onSubscribe({ email: subscription.email });
    };

    return (
        <footer id="footer" className="dark border-0">
            <div className="container center">
                <div className="footer-widgets-wrap">
                    <div className="row mx-auto clearfix">

                        <div className="col-lg-6">
                            <div className="widget subscribe-widget clearfix" data-loader="button">
                                <h4>Subscribe</h4>
                                <div className="widget-subscribe-form-result" />
                                { errors.email ? <p className="error">{ errors.email }</p> : '' }
                                <input ref={ emailInput } type="email"
                                    id="widget-subscribe-form-email"
                                    name="email"
                                    className="form-control form-control-lg not-dark required email"
                                    onChange={ (e) => handleChange(e) }
                                    placeholder="Your Email Address" />
                                <button
                                    className="button button-border button-circle button-light topmargin-sm"
                                    onClick={ (ev) => handleSubmit(ev) }
                                    type="submit">Subscribe Now
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="widget clearfix">
                                <h4>Contact</h4>
                                <p className="lead">795 Folsom Ave, Suite 600<br />San Francisco, CA 94107</p>
                                <div className="center topmargin-sm">
                                    <a href="#" className="social-icon inline-block border-0 si-small si-facebook" title="Facebook">
                                        <i className="icon-facebook" />
                                        <i className="icon-facebook" />
                                    </a>
                                    <a href="#" className="social-icon inline-block border-0 si-small si-twitter" title="Twitter">
                                        <i className="icon-twitter" />
                                        <i className="icon-twitter" />
                                    </a>
                                    <a href="#" className="social-icon inline-block border-0 si-small si-github" title="Github">
                                        <i className="icon-github" />
                                        <i className="icon-github" />
                                    </a>
                                    <a href="#" className="social-icon inline-block border-0 si-small si-pinterest" title="Pinterest">
                                        <i className="icon-pinterest" />
                                        <i className="icon-pinterest" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="copyrights">
                <div className="container center clearfix">
                    Copyrights Canvas 2020 | All Rights Reserved
                </div>
            </div>

        </footer >

    );


};

export default Footer;