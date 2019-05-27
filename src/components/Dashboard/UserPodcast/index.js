import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from '../../'
import podcastActionGenerators from '../../../redux/actions/podcast/podcastActionGenerators'
import { getDangerousHtml } from '../../../utils' 
import './UserPodcast.scss'

class UserPodcast extends Component {

    openEditModal = () => {
        this.props.dispatch((podcastActionGenerators.updateEditModalOpen(this.props.podcast)))
        this.props.toggleEditPodcast()
    }

    render() {

        const { podcast } = this.props
        const { name, tags, start_date, hosts, url, description } = podcast

        const descriptionHtml = getDangerousHtml(description)

        return (
            <div className='UserPodcast'>
             
                    <div className="UserPodcast-details">
                    <section className="Dashboard-infoLabel">
                        <p className='Dashboard-label'>Name:</p>
                        <p className='Dashboard-value'>{name}</p>
                    </section>
                    <section className="Dashboard-infoLabel">
                        <p className='Dashboard-label'>Tags:</p>
                        <p className='Dashboard-value'>{tags}</p>
                    </section>
                    <section className="Dashboard-infoLabel">
                        <p className='Dashboard-label'>Age:</p>
                        <p className='Dashboard-value'>{start_date}</p>
                    </section>
                    <section className="Dashboard-infoLabel">
                        <p className='Dashboard-label'>Link to podcast:</p>
                        <p className='Dashboard-value'>{url}</p>
                    </section>
                    <section>
                        <p className='Dashboard-label'>Description:</p>
                        <div dangerouslySetInnerHTML={descriptionHtml}/>
                    </section>
                    </div>
                    <div className='UserPodcast-edit'>
                        <Button onClick={this.openEditModal}>Edit podcast details</Button>
                    </div>
       
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserPodcast)