import React, { Component } from 'react';
import { Input, TextArea } from '../../index'
import { connect } from 'react-redux'
import episodeAsyncActions from '../../../redux/actions/episode/asyncActions'
import './NewEpisode.scss'

class NewEpisode extends Component {

    state = {
        name:"",
        slug:"",
        snippet:""
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

    updateSnippet = (event) => {
         this.setState({
            snippet: event.target.value
        })
    }

    submitNewEpisode = () => {
        this.props.toggleNewEpisode(false)
        this.props.dispatch((episodeAsyncActions.submitNewEpisode(this.state)))
    }

    render() {

        const { name, slug, tags} = this.state

        return (
                <div className='NewEpisode'>
                    <div className="NewEpisode-details">
                        <section><h3>Add new episode</h3></section>
                        <section className="NewEpisode-name">
                            <p>Name:</p> <Input value={name} onChange={this.updateName}/> 
                        </section>
                        <section className="NewEpisode-slug">
                            <p>Slug:</p> <Input value={slug} onChange={this.updateSlug}/> 
                        </section>
                        <section className="NewEpisode-snippet">
                            <p>Snippet:</p> <TextArea value={tags} onChange={this.updateSnippet}/>
                        </section>
                    </div>
                    <div>
                        <button onClick={this.submitNewEpisode}>Save New Episode</button>
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

export default connect(mapStateToProps)(NewEpisode)