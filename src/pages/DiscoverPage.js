import React, { Component } from 'react';
import { Navigation, Discover } from '../../src/components/';
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
        </div>
    );
  }
}


export default DiscoverPage;
