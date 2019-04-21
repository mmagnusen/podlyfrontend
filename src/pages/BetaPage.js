import React, { Component } from 'react';
import { Navigation, Beta, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class BetaPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <Beta />
            <Footer />
        </div>
    );
  }
}


export default BetaPage;
