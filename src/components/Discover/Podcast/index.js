import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Podcast.scss'

class Podcast extends Component {
  state = {
    selectedOption: null,
  }

  render() {
    const { name, title, snippet, hosts, tags, publish_date, length } = this.props.podcast
    return (
        <div className="SinglePodcast">
            <div className='SinglePodcast-details'>
                <section>
                    <h3>{title}</h3>
                </section>

                <section>
                    <p>{snippet}</p>
                </section>

                <section className='SinglePodcast-nameTags'>
                    <section>
                        <h3>{name}</h3>
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
                        <p>{publish_date}</p>
                    </section>
                    <section>
                        <p>{length}</p>
                    </section>
                </section>
            </div>
            <div className='SinglePodcast-image'>
                <img src='https://picsum.photos/250/250' />
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(Podcast)
