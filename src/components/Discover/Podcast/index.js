import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ENDPOINT } from '../../../constants'
import moment from 'moment'
import { Link  } from 'react-router-dom';
import './Podcast.scss'

class Podcast extends Component {
  state = {
    selectedOption: null,
  }

  render() {
    const { name, podcast, snippet, hosts, publish_date, image } = this.props.podcast

    return (
        <Link to="/play">
            <div className="SinglePodcast">
                <div className='SinglePodcast-details'>
                    <section className='SinglePodcast-name'>
                        <h3>{name}</h3>
                    </section>

                    <section className='SinglePodcast-snippet'>
                        <p>{snippet}</p>
                    </section>

                    <section className='SinglePodcast-nameTags'>
                        <h3>{podcast}</h3>
                    </section>

                    <section>
                        <p>{hosts}</p>
                    </section>

                    <section className='SinglePodcast-dateLength'>
                        <section>
                            <p>{moment(publish_date).format("Do MMM YYYY") }</p>
                        </section>
                        <section>
                            <p>00:59</p>
                        </section>
                    </section>
                </div>
                <div className='SinglePodcast-image'>
                    <img src={`${ENDPOINT}/media/${image}`} />
                </div>
            </div>
        </Link>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(Podcast)