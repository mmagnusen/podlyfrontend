import React, { Component } from 'react';
import { connect } from 'react-redux'
import UserPodcast from '../../UserPodcast'
import { Button } from '../../../'
import podcastAsyncActions from '../../../../redux/actions/podcast/asyncActions'
import './TabPodcasts.scss'

class TabPodcasts extends Component {

    componentDidMount() {
        this.props.dispatch(podcastAsyncActions.getUserPodcasts())
    }

    render() {

    const { reduxPodcast, toggleNewPodcast } = this.props

        return (
            <section className='TabPodcasts'>
           
                <section className='TabPodcasts-title'>
                    <h3>Your podcasts</h3>
                </section>
                {reduxPodcast && reduxPodcast.podcasts && reduxPodcast.podcasts.length === 0 &&
                <section className='TabPodcasts-emptyState' onClick={() => toggleNewPodcast(true)}>
                    <i className="fas fa-microphone"></i>
                    <Button>Add a new podcast to get started</Button>
                </section>
                }
                {reduxPodcast && reduxPodcast.podcasts.length > 0 && reduxPodcast.podcasts.map((podcast) => (
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

