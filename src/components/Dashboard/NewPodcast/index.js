import React, { Component } from 'react';
import { Input, TextArea } from '../../index'
import { connect } from 'react-redux'
import podcastAsyncActions from '../../../redux/actions/podcast/asyncActions'
import './NewPodcast.scss'

class NewPodcast extends Component {

    state = {
        name:"",
        slug:"",
        start_date:"",
        hosts:"",
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

    updateHosts = (event) => {
        this.setState({
            hosts: event.target.value
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
        //this.props.toggleNewPodcast(false)
        this.props.dispatch((podcastAsyncActions.submitNewPodcast(this.state)))
    }

    render() {

        const { name, slug, tags, start_date, hosts, url, description } = this.state

        return (
                <div className='EditPodcast'>
                    <div className="EditPodcast-details">
                    <section>
                        <p>Name:</p> <Input value={name} onChange={this.updateName}/> 
                    </section>
                    <section>
                        <p>Slug:</p> <Input value={slug} onChange={this.updateSlug}/> 
                    </section>
                    <section>
                        <p>Tags:</p> <Input value={tags} onChange={this.updateTags}/>
                    </section>
                    <section>
                        <p>Age:</p> <Input value={start_date} onChange={this.updateStartDate}/>
                    </section>
                    <section>
                        <p>Host:</p> <Input value={hosts} onChange={this.updateHosts}/>
                    </section>
                    <section>
                        <p>Link to podcast: <Input value={url} onChange={this.updateUrl}/></p>
                    </section>
                    <section>
                        <p>Description: <TextArea value={description} onChange={this.updateDescription}/></p>
                    </section>
                    </div>
                    <div>
                        <button onClick={this.submitNewPodcast}>Save changes</button>
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