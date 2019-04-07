import React, { Component } from 'react';
import { connect } from 'react-redux'
import mp3 from '../../resources/lay.mp3'
import { PlayList } from '../index'
import { ENDPOINT } from '../../constants'
import moment from 'moment'
import Truncate from 'react-truncate';
import episodeAsyncActions from '../../redux/actions/episode/asyncActions'
import './Play.scss'

class Play extends Component {

    componentDidMount() {
        this.props.dispatch(episodeAsyncActions.getEpisode(this.props.slug))
    }

    render() {

    const { podcast_name, snippet, image, publish_date, podcast, audio } = this.props.episode.currentlyPlaying

        return (
            <section className='Play'>
                <section className='Play-inner'>
                    <section className='Play-info' >
                        <section className='Play-infoImage'>
                            <img src={`${ENDPOINT}/media/${image}`} alt='host cover'/>
                        </section>
                        <div>
                            <h3>{podcast_name}</h3>
                            <Truncate lines={3} ellipsis={<span>...</span>}>
                                {snippet}
                            </Truncate>
                            <p>{moment(publish_date).format("Do MMM YYYY") }</p>
                        </div>
                    </section>
                    <section className='Play-playerHtml'>
                        <audio controls id='player' key={audio}>
                            <source src={audio} type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                    </section>

                    {podcast && <PlayList pk={podcast}/>}

                </section>
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        discover: state.discover,
        episode: state.episode
    }
}

export default connect(mapStateToProps)(Play)
