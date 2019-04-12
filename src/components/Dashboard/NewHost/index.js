import React, { Component } from 'react';
import { Input, TextArea, Button } from '../../index'
import { connect } from 'react-redux'
import Select from 'react-select';
import hostAsyncActions from '../../../redux/actions/host/asyncActions'
import './NewHost.scss'
import { storage } from '../../../firebase'

class NewHost extends Component {

    state = {
        name:"",
        podcastSelectOption: null,
        twitter_name:"",
        twitter_url:"",
        bio: "",
        profile_pic: null,
        profile_url: null,
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

    updateTwitterName = (event) => {
        this.setState({
            twitter_name: event.target.value
        })
    }

    updateTwitterUrl = (event) => {
        this.setState({
            twitter_url: event.target.value
        })
    }

    updateBio = (event) => {
         this.setState({
            bio: event.target.value
        })
    }

    submitNewHost = () => {
        this.props.toggleNewHost(false)
        const data = {
            name: this.state.name,
            host_of_podcast: this.state.podcastSelectOption.value,
            twitter_name: this.state.twitter_name,
            twitter_url: this.state.twitter_url,
            bio: this.state.bio,
            image: this.state.profile_url,
        }
        this.props.dispatch((hostAsyncActions.submitNewHost(data)))
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
            const profile_pic = e.target.files[0]

            this.setState({
                profile_pic
            })
        }   
    }

    handleUpload = () => {
    const { profile_pic } = this.state
       const uploadTask =  storage.ref(`profile/${profile_pic.name}`).put(profile_pic);
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
            storage.ref('profile').child(profile_pic.name).getDownloadURL().then(profile_url => {
                console.log('type of url', typeof profile_url, profile_url)
                
                this.setState({
                    profile_url
                })
            })
       },
    )
    }

    render() {

        const { name, slug, tags, podcastSelectOption, profile_url } = this.state

        return (
            <div className='NewHost'>
                <div className="NewHost-details">
                    <section><h3>Add new host</h3></section>
                    <section className="NewHost-profilePic">
                        <p>Profile pic:</p>
                        <div className="NewHost-profilePicImageSelection">
                            <div className="NewHost-upload">
                                <section className="NewHost-uploadPreview">
                                {profile_url ? 
                                    <img src={profile_url}  alt='host profile'/>
                                    :
                                    <i className="fas fa-question" />
                                }
                                </section>
                                <section>
                                    <input type='file' onChange={this.handleChange}/>
                                </section>
                            </div>
                            <section  className="NewHost-uploadSave">
                                <Button onClick={this.handleUpload}>preview upload</Button>
                            </section>
                        </div>
                    </section>
                    <section className="NewHost-podcast">
                        <p>Podcast:</p>
                        <Select
                            value={podcastSelectOption}
                            onChange={this.updateSelectedPodcastOption}
                            options={this.getPodcastSelectOptions()}
                        />
                    </section>
                    <section className="NewHost-name">
                        <p>Name:</p> <Input value={name} onChange={this.updateName}/> 
                    </section>
                    <section className="NewHost-twitterName">
                        <p>Twitter handle:</p> <Input value={slug} onChange={this.updateTwitterName}/> 
                    </section>
                    <section className="NewHost-twitterUrl">
                        <p>Twitter Url:</p> <Input value={slug} onChange={this.updateTwitterUrl}/> 
                     </section>
                    <section className="NewHost-bio">
                        <p>Bio:</p> <TextArea value={tags} onChange={this.updateBio}/>
                    </section>
                </div>
                <div className='NewHost-saveHost'>
                    <Button onClick={this.submitNewHost}>Save New Host</Button>
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

export default connect(mapStateToProps)(NewHost)