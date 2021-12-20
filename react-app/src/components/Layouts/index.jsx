import React from 'react';
import { Link } from 'react-router-dom';

export const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Sign in
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Sign up
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/subscribe" className="nav-link">
                        Subscribe
                    </Link>
                </li>

            </ul>
        );
    }
    return null;
};

export const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/logout" className="nav-link">
                        Logout
                    </Link>
                </li>

            </ul>
        );
    }

    return null;
};

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container">

                    <Link to="/" className="navbar-brand">
                        { this.props.appName.toLowerCase() }
                    </Link>

                    { this.props.currentUser
                        ? <LoggedInView currentUser={ this.props.currentUser } />
                        : <LoggedOutView currentUser={ this.props.currentUser } />
                    }

                </div>
            </nav>
        );
    }
}

export default Header;