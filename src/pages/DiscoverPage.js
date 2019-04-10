import React, { Component } from 'react';
import { Navigation, Discover, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class DiscoverPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Discover Podcasts</title>
            </Helmet>
            <Navigation />
            <Discover />
            <Footer />
        </div>
    );
  }
}


export default DiscoverPage;
