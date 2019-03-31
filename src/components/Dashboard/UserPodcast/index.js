import React, { Component } from 'react';
import { connect } from 'react-redux'
import podcastActionGenerators from '../../../redux/actions/podcast/podcastActionGenerators'
import './UserPodcast.scss'

class UserPodcast extends Component {

    openEditModal = () => {
        this.props.dispatch((podcastActionGenerators.updateEditModalOpen(this.props.podcast)))
        this.props.toggleEditPodcast()
    }

    render() {

        const { podcast } = this.props
        const { name, tags, start_date, hosts, url } = podcast

        return (
            <div className='UserPodcast'>
                <div className="UserPodcast-details">
                    <section>
                        <p>Name:</p><p>{name}</p>
                    </section>
                    <section>
                        <p>Tags:</p><p>{tags}</p>
                    </section>
                    <section>
                        <p>Age:</p><p>{start_date}</p>
                    </section>
                    <section>
                        <p>Host:</p><p>{hosts}</p>
                    </section>
                    <section>
                        <p>Link to podcast:</p><p>{url}</p>
                    </section>
                </div>
                <div className='UserPodcast-edit'>
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