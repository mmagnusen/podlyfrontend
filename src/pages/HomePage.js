import React, { Component } from 'react';
import { Navigation, Home } from '../../src/components/';
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
        </div>
    );
  }
}


export default HomePage;
