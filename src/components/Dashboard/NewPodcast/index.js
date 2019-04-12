import React, { Component } from 'react';
import { Input, TextArea, Button } from '../../index'
import { connect } from 'react-redux'
import podcastAsyncActions from '../../../redux/actions/podcast/asyncActions'
import './NewPodcast.scss'

class NewPodcast extends Component {

    state = {
        name:"",
        slug:"",
        start_date:"",
        url:"",
        description:"",
        tags:""
    }

    updateName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    updateSlug = (event) => {
        this.setState({
            slug: event.target.value
        })
    }

    updateTags = (event) => {
         this.setState({
            tags: event.target.value
        })
    }

    updateStartDate = (event) => {
        this.setState({
            start_date: event.target.value
        })
    }

    updateUrl = (event) => {
        this.setState({
            url: event.target.value
        })
    }

    updateDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    submitNewPodcast = () => {
        this.props.toggleNewPodcast(false)
        this.props.dispatch((podcastAsyncActions.submitNewPodcast(this.state)))
    }

    render() {

        const { name, slug, tags, start_date, url, description } = this.state

        return (
                <div className='NewPodcast'>
                    <div className="NewPodcast-details">
                    <section><h3>Add new podcast</h3></section>
                    <section className="NewPodcast-name">
                        <p>Name:</p> <Input value={name} onChange={this.updateName}/> 
                    </section>
                    <section className="NewPodcast-slug">
                        <p>Slug:</p> <Input value={slug} onChange={this.updateSlug}/> 
                    </section>
                    <section className="NewPodcast-tags">
                        <p>Tags:</p> <Input value={tags} onChange={this.updateTags}/>
                    </section>
                    <section className="NewPodcast-age">
                        <p>Age:</p> <Input value={start_date} onChange={this.updateStartDate}/>
                    </section>
                    <section className="NewPodcast-link">
                        <p>Link to podcast:</p> <Input value={url} onChange={this.updateUrl}/>
                    </section>
                    <section className="NewPodcast-description">
                        <p>Description:</p><TextArea value={description} onChange={this.updateDescription}/>
                    </section>
                    </div>
                    <div className='NewPodcast-save'>
                        <Button onClick={this.submitNewPodcast}>Save changes</Button>
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

export default connect(mapStateToProps)(NewPodcast)