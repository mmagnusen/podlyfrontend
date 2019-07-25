import React from 'react';
import { Play } from '../../src/components/';

const PlayPage = () => (
  <div className="App">
    <Play slug={this.props.match.params.slug} />
  </div>
);

export default PlayPage;
