

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from '../../'
import hostActionGenerators from '../../../redux/actions/host/hostActionGenerators'
import './UserHost.scss'

class UserHost extends Component {


    openEditModal = () => {
        // this.props.dispatch((episodeActionGenerators.updateEditModalOpen(this.props.episode)))
        // this.props.toggleEditEpisode()
    }

    render() {

    const { name, twitter_name, twitter_url, bio } = this.props.host
    console.log('props from user host', this.props.host)

        return (
            <section className='UserHost'>
                <section className='UserEpisode-detail'>
                    <p>Name:</p> 
                    <p>{name}</p> 
                </section>
                <section className='UserEpisode-detail'>
                    <p>Twitter Handle:</p> 
                    <p>{twitter_name}</p> 
                </section>
                <section className='UserEpisode-detail'>       
                    <p>snippet:</p> 
                    <p>{twitter_url}</p> 
                </section>
                <section className='UserEpisode-detail'>       
                    <p>Bio:</p> 
                    <p>{bio}</p> 
                </section>
                { /* <section className='UserEpisode-edit'>
                    <Button onClick={this.openEditModal}>Edit host profile</Button>
                 </section>
                */ }
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reduxHhost: state.host
    }
}

export default connect(mapStateToProps)(UserHost)

