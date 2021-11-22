import React, { Component } from 'react';

class Logout extends Component {

    componentDidMount() {
        localStorage.removeItem('token');
        window.location.replace('/login');
    }

    render() {
        return (
            <React.Fragment>
                <h1>&nbsp;</h1>
            </React.Fragment>
        );
    }
}


export default Logout;

