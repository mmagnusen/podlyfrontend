import React, { Component } from 'react';
import { Navigation, Login, Footer } from '../../src/components/';

class LoginPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Login />
            <Footer />
        </div>
    );
  }
}


export default LoginPage;
