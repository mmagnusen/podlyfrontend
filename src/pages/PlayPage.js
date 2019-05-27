import React, { Component } from 'react';
import { Play } from '../../src/components/';

class PlayPage extends Component {

  render() {
    return (
        <div className="App">
            <Play slug={this.props.match.params.slug}/>
        </div>
    );
  }
}

export default PlayPage;
