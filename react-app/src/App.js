
import React, { Component } from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from "./components/Layouts";
import routes from './routes';
import "./App.css";
import agent from "./store/agent";
import { onAppLoad } from "./store/common/slice";

class App extends Component {

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      agent.setToken(token);
    }

    this.props.onAppLoad({ token, test: 'test' });
  }

  render() {

    return (

      <React.Fragment>

        <Router >

          <Header
            appName={ this.props.appName }
            currentUser={ this.props.currentUser } />


          <Routes>
            { routes.map((route, idx) =>

              <Route path={ route.path } element={ route.component } key={ idx } />

            ) }
          </Routes>
        </Router>
      </React.Fragment>
    );

  }
}

const mapStateToProps = state => {
  return {
    appLoaded: state.commonReducer.appLoaded,
    appName: state.commonReducer.appName,
    currentUser: state.commonReducer.currentUser,
    redirectTo: state.commonReducer.redirectTo
  };
};

export default connect(mapStateToProps, { onAppLoad })(App);