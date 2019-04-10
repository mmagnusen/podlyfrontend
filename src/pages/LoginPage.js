import React, { Component } from 'react';
import { Navigation, Login, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class LoginPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <Login />
            <Footer />
        </div>
    );
  }
}


export default LoginPage;
