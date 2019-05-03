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
                    <section className="UserPodcast-twoColumn">
                        <p>Name:</p><p>{name}</p>
                    </section>
                    <section className="UserPodcast-twoColumn">
                        <p>Tags:</p><p>{tags}</p>
                    </section>
                    <section className="UserPodcast-twoColumn">
                        <p>Age:</p><p>{start_date}</p>
                    </section>
                    <section className="UserPodcast-twoColumn">
                        <p>Host:</p><p>{hosts}</p>
                    </section>
                    <section className="UserPodcast-twoColumn">
                        <p>Link to podcast:</p><p>{url}</p>
                    </section>
                    <section className="UserPodcast-description">
                        <p>Description:</p>
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