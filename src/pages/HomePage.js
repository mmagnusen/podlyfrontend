import React, { Component } from 'react';
import { Header, Home } from '../../src/components/';

class HomePage extends Component {

  render() {
    return (
        <div className="App">
            <Header />
            <Home />
        </div>
    );
  }
}


export default HomePage;
