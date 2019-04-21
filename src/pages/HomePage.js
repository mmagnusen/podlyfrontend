import React, { Component } from 'react';
import { Navigation, Home, Footer } from '../../src/components/';

class HomePage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Home />
            <Footer />
        </div>
    );
  }
}


export default HomePage;
