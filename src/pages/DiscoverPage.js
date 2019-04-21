import React, { Component } from 'react';
import { Navigation, Discover, Footer } from '../../src/components/';

class DiscoverPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Discover />
            <Footer />
        </div>
    );
  }
}


export default DiscoverPage;
