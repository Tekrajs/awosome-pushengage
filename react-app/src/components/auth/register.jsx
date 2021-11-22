import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, registerUser } from '../../store/auth/slice';
import sideImage from '../../images/draw1.png';

class Register extends Component {

    onChange = ev => {
        this.props.updateUserState({ key: [ev.target.name], value: ev.target.value });
    };

    handleSubmit = () => {
        this.props.registerUser(this.props.user);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.redirectTo !== this.props.redirectTo) {
            window.location.replace(this.props.redirectTo);
        }
    }

    render() {

        return (
            <div>
                <section className="vh-100" style={ { backgroundColor: '#eee' } }>
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black" style={ { borderRadius: 25 } }>
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                                <form className="mx-1 mx-md-4">
                                                    <div className="d-flex flex-row align-items-center mb-4">

                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="text" name="username" id="username" className="form-control" onChange={ (ev) => this.onChange(ev) } />
                                                            <label className={ "form-label" + (this.props.errors.username ? ' error' : '') } htmlFor="username">Username { this.props.errors.username } </label>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input name="email" type="email" id="email" className="form-control" onChange={ (ev) => this.onChange(ev) } />
                                                            <label className={ "form-label" + (this.props.errors.email ? ' error' : '') } htmlFor="email">Email { this.props.errors.email }</label>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input name="password" type="password" id="password" className="form-control" onChange={ (ev) => this.onChange(ev) } />
                                                            <label className="form-label" htmlFor="password">Password</label>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="button" className="btn btn-primary btn-lg" onClick={ this.handleSubmit }>Register</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                                <img src={ sideImage } className="img-fluid" alt="Sample" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>;
            </div>
        );

    }

}

const mapStateToProps = state => {
    let { user, errors, redirectTo } = state.authReducer;
    return { user, errors, redirectTo };
};

export default connect(mapStateToProps, { updateUserState: actions.updateUserState, registerUser })(Register);

