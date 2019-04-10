

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from '../../'
import episodeActionGenerators from '../../../redux/actions/episode/episodeActionGenerators'
import moment from 'moment';
import './UserEpisode.scss'

class UserEpisode extends Component {


    openEditModal = () => {
        this.props.dispatch((episodeActionGenerators.updateEditModalOpen(this.props.episode)))
        this.props.toggleEditEpisode()
    }

    render() {

    const { name, slug, snippet, publish_date } = this.props.episode

        return (
            <section className='UserEpisode'>
                <section className='UserEpisode-detail'>
                    <p>title:</p> 
                    <p>{name}</p> 
                </section>
                <section className='UserEpisode-detail'>
                    <p>slug:</p> 
                    <p>{slug}</p> 
                </section>
                <section className='UserEpisode-detail'>       
                    <p>snippet:</p> 
                    <p>{snippet}</p> 
                </section>
                <section className='UserEpisode-detail'>       
                    <p>Publish Date:</p> 
                    <p>{moment(publish_date).format("Do MMM YYYY") }</p> 
                </section>
                <section className='UserEpisode-edit'>
                    <Button onClick={this.openEditModal}>Edit episode</Button>
                </section>
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserEpisode)

