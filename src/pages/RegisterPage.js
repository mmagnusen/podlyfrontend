import React, { Component } from 'react';
import { Navigation, Register } from '../../src/components/';
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
        </div>
    );
  }
}


export default RegisterPage;
