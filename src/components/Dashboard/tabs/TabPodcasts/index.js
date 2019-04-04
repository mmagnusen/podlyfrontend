import React, { Component } from 'react';
import { connect } from 'react-redux'
import UserPodcast from '../../UserPodcast'
import podcastAsyncActions from '../../../../redux/actions/podcast/asyncActions'
import './TabPodcasts.scss'

class TabPodcasts extends Component {

    componentDidMount() {
        this.props.dispatch(podcastAsyncActions.getUserPodcasts())
    }

    render() {

    const { reduxPodcast, toggleNewPodcast } = this.props

        return (
            <section className='TabPodcasts-yourPodcasts'>
            <section className='TabPodcasts-yourPodcastsTitle'>
                <h3>Your podcasts</h3>
            </section>
            <section className='TabPodcasts-addPodcast'>
                <button onClick={() => toggleNewPodcast(true)}>Add new podcast</button>
            </section>
            { reduxPodcast.podcasts && reduxPodcast.podcasts.map((podcast) => (
                <UserPodcast 
                    key={podcast.name} 
                    podcast={podcast}
                    toggleEditPodcast={this.props.toggleEditPodcast}
                />
            ))}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        reduxPodcast: state.podcast
    }
}

export default connect(mapStateToProps)(TabPodcasts)

