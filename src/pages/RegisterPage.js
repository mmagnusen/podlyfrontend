import React, { Component } from 'react';
import { Header, Register } from '../../src/components/';
import { Helmet } from "react-helmet";

class RegisterPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Header />
            <Register />
        </div>
    );
  }
}


export default RegisterPage;
