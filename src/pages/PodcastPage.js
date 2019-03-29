import React, { Component } from 'react';
import { Navigation, PodcastContent } from '../../src/components/';
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
        </div>
    );
  }
}


export default PodcastPage;
