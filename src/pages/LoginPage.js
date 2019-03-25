import React, { Component } from 'react';
import { Header, Login } from '../../src/components/';
import { Helmet } from "react-helmet";

class LoginPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Header />
            <Login />
        </div>
    );
  }
}


export default LoginPage;
