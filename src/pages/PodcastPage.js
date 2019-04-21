import React, { Component } from 'react';
import { Navigation, PodcastContent, Footer } from '../../src/components/';

class PodcastPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <PodcastContent />
            <Footer />
        </div>
    );
  }
}


export default PodcastPage;
