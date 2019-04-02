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
    const { name, podcast, snippet, hosts, tags, publish_date, length, image } = this.props.podcast
    return (
        <Link to="/play">
            <div className="SinglePodcast">
                <div className='SinglePodcast-details'>
                    <section>
                        <h3>{name}</h3>
                    </section>

                    <section>
                        <p>{snippet}</p>
                    </section>

                    <section className='SinglePodcast-nameTags'>
                        <section>
                            <h3>{podcast}</h3>
                        </section>

                        <section>
                            <p>{tags}</p>
                        </section>
                    </section>

                    <section>
                        <p>{hosts}</p>
                    </section>

                    <section className='SinglePodcast-dateLength'>
                        <section>
                            <p>{moment(publish_date).format("Do MMM YYYY") }</p>
                        </section>
                        <section>
                            <p>{length}</p>
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
