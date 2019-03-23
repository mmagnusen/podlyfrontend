import React, { Component } from 'react';
import { Header, PodcastContent } from '../../src/components/';

class PodcastPage extends Component {

  render() {
    return (
        <div className="App">
            <Header />
            <PodcastContent />
        </div>
    );
  }
}


export default PodcastPage;
