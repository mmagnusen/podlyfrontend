import React, { Component } from 'react';
import { Navigation, Community, Footer } from '../../src/components/';

class CommunityPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Community />
            <Footer />
        </div>
    );
  }
}


export default CommunityPage;
