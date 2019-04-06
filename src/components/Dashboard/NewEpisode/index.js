import React, { Component } from 'react';
import { Input, TextArea } from '../../index'
import { connect } from 'react-redux'
import Select from 'react-select';
import episodeAsyncActions from '../../../redux/actions/episode/asyncActions'
import './NewEpisode.scss'

class NewEpisode extends Component {

    state = {
        name:"",
        slug:"",
        snippet:"",
        podcastSelectOption: null,
    }

    componentDidMount() {
        this.setState({
            podcastSelectOption:  {
                value: this.props.podcast.podcasts[0].pk, 
                label: this.props.podcast.podcasts[0].name
            }
        })
    }

    updateSelectedPodcastOption = (option) => {
        this.setState({
            podcastSelectOption:  option
        })
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
        const data = {
            name: this.state.name,
            slug: this.state.slug,
            snippet: this.state.snippet,
            podcast: this.state.podcastSelectOption.value
        }
        this.props.dispatch((episodeAsyncActions.submitNewEpisode(data)))
    }

    getPodcastSelectOptions = () => {
        const options = []
        const { podcasts } = this.props.podcast

        podcasts && podcasts.forEach((podcast) => {
            options.push({value: podcast.pk, label: podcast.name})
        })

        return options
    }

    render() {

        const { name, slug, tags, podcastSelectOption } = this.state

        return (
            <div className='NewEpisode'>
                <div className="NewEpisode-details">
                    <section><h3>Add new episode</h3></section>
                    <Select
                        value={podcastSelectOption}
                        onChange={this.updateSelectedPodcastOption}
                        options={this.getPodcastSelectOptions()}
                    />
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
        podcast: state.podcast
    }
}

export default connect(mapStateToProps)(NewEpisode)