import React, { Component } from 'react';
import { Navigation, PodcastContent, Footer } from '../../src/components/';
import { Helmet} from "react-helmet";

class PodcastPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
              <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <PodcastContent />
            <Footer />
        </div>
    );
  }
}


export default PodcastPage;
