import React, { Component } from 'react';
import { Navigation, Play, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class PlayPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <Play slug={this.props.match.params.slug}/>
            <Footer />
        </div>
    );
  }
}

export default PlayPage;
