import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'
import { ENDPOINT } from '../../constants'
import HostThumbnail from './HostThumbnail'
import './Podcast.scss'

class Podcast extends Component {

  state = {
    hosts: []
  }

  componentDidMount() {

    const singleEndpoint = `${ENDPOINT}/api/host?slug=${this.props.podcast.slug}`
    console.log('get hosts')
        axios.get(singleEndpoint)
        .then((response) => {
            console.log('response', response)
            this.setState({
                hosts: response.data
            })
        })
  }

  render() {
      const { name, tags, start_date, slug } = this.props.podcast
      const { hosts } = this.state

    return (
      <div>
      <Link to={`/podcast/${slug}`}>
          <div className="Podcast">
            <section className="Podcast-details">
              <p>Name: {name}</p>
              <p>Tags: {tags}</p>
              <p>Age: {start_date}</p>
              <p className='Podcast-more'>Find out more</p>
            </section>
            {/*
              <section className="Podcast-hosts">
                {hosts && hosts.map((host) => <HostThumbnail host={host}/>)}
              </section>
            */}
          </div>
      </Link>
      </div>
    );
  }
}

export default Podcast;
