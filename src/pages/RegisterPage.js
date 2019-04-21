import React, { Component } from 'react';
import { Navigation, Register, Footer } from '../../src/components/';

class RegisterPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Register />
            <Footer />
        </div>
    );
  }
}


export default RegisterPage;
