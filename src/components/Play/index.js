import React, { Component } from 'react';
import { connect } from 'react-redux'
import discoverAsyncActions from './../../redux/actions/discover/asyncActions'
import mp3 from '../../resources/lay.mp3'
import ListItem from './ListItem'
import axios from 'axios'
import { ENDPOINT } from '../../constants'
import moment from 'moment'
import Truncate from 'react-truncate';
import './Play.scss'

class Play extends Component {

    state = {
        podcast: {},
        play: false,
    }

    componentDidMount() {
        this.props.dispatch(discoverAsyncActions.freshRequest())

        const singleEndpoint = `${ENDPOINT}/api/episode?slug=${this.props.slug}`
            axios.get(singleEndpoint)
            .then((response) => {
               this.setState({
                   podcast: response.data[0]
               })
            })

      }

      static audio = document.getElementById("player");  

      togglePlayer = () => {

        const audio = document.getElementById("player");  
        
        if (this.state.play === true ) {

            this.setState({
                play: false
            })

            audio.pause()

        } else {

            this.setState({
                play: true
            })   

            audio.play()

        }
      }

    render() {

    const { episodes } = this.props
    const { podcast, snippet, image, publish_date } = this.state.podcast

        return (
            <section className='Play'>
                <section className='Play-inner'>
                    <section className='Play-info' >
                        <section className='Play-infoImage'>
                            <img src={`${ENDPOINT}/media/${image}`} />
                        </section>
                        <div>
                            <h3>{podcast}</h3>
                            <Truncate lines={3} ellipsis={<span>...</span>}>
                                {snippet}
                            </Truncate>
                            <p>{moment(publish_date).format("Do MMM YYYY") }</p>
                        </div>
                    </section>

                    <section className='Play-player'>
                        <section className='Play-playerInner'>
                            <section className='Play-playerControls'>
                                <div>
                                    <i className="fas fa-step-backward"></i>
                                </div>
                                <div>
                                    {
                                        this.state.play === false ?
                                        <i className="fas fa-play circle" onClick={this.togglePlayer}></i>
                                        :
                                        <i className="fas fa-pause circle" onClick={this.togglePlayer}></i>
                                    }
                                </div>
                                <div>
                                    <i className="fas fa-step-forward"></i>
                                </div>
                            </section>
                            <section className='Play-playerProgress'>
                                <div className="ui teal progress" data-percent="74" id="example1">
                                    <div className="bar">
                                        <div className="progress"></div>
                                    </div>
                                </div>

                            </section>
                        </section>
                    </section>

                    <section className='Play-playerxxx'>
                        <audio controls id='player'>
                            <source src={mp3} type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                    </section>

                    <section  className='Play-list'>
                        { episodes && episodes.map(( podcast ) => <ListItem podcast={podcast}/>)}
                    </section>
                </section>
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        discover: state.discover
    }
}

export default connect(mapStateToProps)(Play)
