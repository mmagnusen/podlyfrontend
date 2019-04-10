import React, { Component } from 'react';
import { Navigation, Register, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class RegisterPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <Register />
            <Footer />
        </div>
    );
  }
}


export default RegisterPage;
