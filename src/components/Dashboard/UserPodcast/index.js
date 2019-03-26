import React, { Component } from 'react';
import { connect } from 'react-redux'
import podcastActionGenerators from '../../../redux/actions/podcast/podcastActionGenerators'
import './UserPodcast.scss'

class UserPodcast extends Component {

    openEditModal = () => {
        this.props.dispatch((podcastActionGenerators.updateEditModalOpen(true)))
    }

    render() {

        const { podcast } = this.props
        const { name, tags, start_date, hosts, url } = podcast

        return (
            <div className='UserPodcast'>
                <div className="UserPodcast-details">
                    <p>Name: {name}</p>
                    <p>Tags: {tags}</p>
                    <p>Age: {start_date}</p>
                    <p>Host: {hosts}</p>
                    <p>Link to podcast: {url}</p>
                </div>
                <div>
                    <button onClick={this.openEditModal}>Edit podcast</button>
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