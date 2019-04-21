import React, { Component } from 'react';
import { Navigation, Beta, Footer } from '../../src/components/';

class BetaPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Beta />
            <Footer />
        </div>
    );
  }
}


export default BetaPage;
