import React, { Component } from 'react';
import { Input, TextArea } from '../../index'
import { connect } from 'react-redux'
import podcastAsyncActions from '../../../redux/actions/podcast/asyncActions'
import podcastActionGenerators from '../../../redux/actions/podcast/podcastActionGenerators'
import './EditPodcast.scss'

class EditPodcast extends Component {

    updateName = (event) => {
        this.props.dispatch(podcastActionGenerators.updateName(event.target.value))
    }

    updateTags = (event) => {
        this.props.dispatch((podcastActionGenerators.updateTags(event.target.value)))
    }

    updateStartDate = (event) => {
        this.props.dispatch((podcastActionGenerators.updateStartDate(event.target.value)))
    }

    updateHosts = (event) => {
        this.props.dispatch((podcastActionGenerators.updateHosts(event.target.value)))
    }

    updateUrl = (event) => {
        this.props.dispatch((podcastActionGenerators.updateUrl(event.target.value)))
    }

    updateDescription = (event) => {
        this.props.dispatch((podcastActionGenerators.updateDescription(event.target.value)))
    }

    submitChanges = () => {
        this.props.dispatch((podcastAsyncActions.submitChanges()))
    }

    render() {

        const { name, tags, start_date, hosts, url, description } = this.props.podcast

        return (
                <div className='EditPodcast'>
                    <div className="EditPodcast-details">
                    <section><h3>Edit this podcast podcast</h3></section>
                    <section className="EditPodcast-name">
                        <p>Name:</p> <Input value={name} onChange={this.updateName}/> 
                    </section>
                    <section className="EditPodcast-tags">
                        <p>Tags:</p> <Input value={tags} onChange={this.updateTags}/>
                    </section>
                    <section className="EditPodcast-age">
                        <p>Age:</p> <Input value={start_date} onChange={this.updateStartDate}/>
                    </section>
                    <section className="EditPodcast-host">
                        <p>Host:</p> <Input value={hosts} onChange={this.updateHosts}/>
                    </section>
                    <section className="EditPodcast-link">
                        <p>Link to podcast:</p> <Input value={url} onChange={this.updateUrl}/>
                    </section>
                    <section className="EditPodcast-description">
                        <p>Description:</p><TextArea value={description} onChange={this.updateDescription}/>
                    </section>
                    </div>
                    <div>
                        <button onClick={this.submitChanges}>Save changes</button>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        podcast: state.podcast.currentPodcast
    }
}

export default connect(mapStateToProps)(EditPodcast)