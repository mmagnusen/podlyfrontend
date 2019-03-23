import React, { Component } from 'react';
import { Header, Home } from '../../src/components/';
import { Helmet } from "react-helmet";

class HomePage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Header />
            <Home />
        </div>
    );
  }
}


export default HomePage;
