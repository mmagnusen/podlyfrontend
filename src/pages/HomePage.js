import React, { Component } from 'react';
import { Navigation, Home, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class HomePage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <Home />
            <Footer />
        </div>
    );
  }
}


export default HomePage;
