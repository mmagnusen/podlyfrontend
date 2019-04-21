import React, { Component } from 'react';
import { Navigation, Play, Footer } from '../../src/components/';

class PlayPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Play slug={this.props.match.params.slug}/>
            <Footer />
        </div>
    );
  }
}

export default PlayPage;
