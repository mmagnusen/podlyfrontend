import React, { Component } from 'react';
import { Input, TextArea } from '../../index'
import { connect } from 'react-redux'
import Select from 'react-select';
import episodeAsyncActions from '../../../redux/actions/episode/asyncActions'
import './NewEpisode.scss'
import { storage } from '../../../firebase'

class NewEpisode extends Component {

    state = {
        name:"",
        slug:"",
        snippet:"",
        podcastSelectOption: null,
        audio: null,
        url: null,
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
            podcast: this.state.podcastSelectOption.value,
            audio: this.state.url
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

    handleChange = (e) => {

        if ( e.target.files[0] ) {
            const audio = e.target.files[0]

            this.setState({
                audio
            })
        }
    }

    handleUpload = () => {
    const { audio } = this.state
       const uploadTask =  storage.ref(`episodes/${audio.name}`).put(audio);
       uploadTask.on('state_changed', 
       (snapshot) => {
           //progress function ...
       },
       (error) => {
           //error function ...
           console.log('error:', error)
       },
       () => {
            //complete function ...
            storage.ref('episodes').child(audio.name).getDownloadURL().then(url => {
                console.log('type of url', typeof url, url)
                this.setState({
                    url
                })
            })
       },
    )
    }

    render() {

        const { name, slug, tags, podcastSelectOption } = this.state

        return (
            <div className='NewEpisode'>
                <div className="NewEpisode-details">
                    <section><h3>Add new episode</h3></section>

                    <section className="NewEpisode-audio">
                        <p>Audio:</p>
                        <div>
                        <input type='file' onChange={this.handleChange}/>
                        <button onClick={this.handleUpload}>save upload</button>
                        </div>
                    </section>
                    <section className="NewEpisode-podcast">
                        <p>Podcast:</p>
                        <Select
                            value={podcastSelectOption}
                            onChange={this.updateSelectedPodcastOption}
                            options={this.getPodcastSelectOptions()}
                        />
                    </section>
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