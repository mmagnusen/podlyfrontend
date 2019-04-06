import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux'
import classnames from 'classnames'
import episodeActionGenerators from '../../redux/actions/episode/episodeActionGenerators'
import './ListItem.scss'

class ListItem extends Component {

    updateCurrentlyPlaying = () => {
        this.props.dispatch(episodeActionGenerators.setPlaying(this.props.episode))
    }

    render() {

    const { name, publish_date } = this.props.episode

    const isCurrentlyPlaying = this.props.reduxEpisode.currentlyPlaying.pk === this.props.episode.pk

        return (
            <section 
            className={classnames('ListItem', {'currentlyPlaying': isCurrentlyPlaying})}

            onClick={this.updateCurrentlyPlaying}>
                <section>
                    <p>{name}</p>
                </section>
                <section>
                    <p>{moment(publish_date).format("Do MMM YYYY")} </p>
                </section>
                <section>
                    <p>00:59</p>
                </section>
            </section> 
        )
    }
}


const mapStateToProps = (state) => {
    return {
        reduxEpisode: state.episode
    }
}

export default connect(mapStateToProps)(ListItem) 
