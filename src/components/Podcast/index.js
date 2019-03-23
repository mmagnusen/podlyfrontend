import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import './Podcast.scss'

class Podcast extends Component {
  render() {
      const { name, tags, start_date, hosts, slug } = this.props.podcast

    return (
      <div>
      <Link to={`/podcast/${slug}`}>
          <div className="Podcast">
          <p>Name: {name}</p>
          <p>Tags: {tags}</p>
          <p>Age: {start_date}</p>
          <p>Host: {hosts}</p>
          <p className='Podcast-more'>Find out more</p>
          </div>
      </Link>
      </div>
    );
  }
}

export default Podcast;
