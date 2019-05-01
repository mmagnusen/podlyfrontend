import React, { Component } from 'react';
import { Input, TextArea, Button } from '../../index'
import { connect } from 'react-redux'
import Select from 'react-select';
import hostAsyncActions from '../../../redux/actions/host/asyncActions'
import { formValidation } from '../../../utils/'
import './NewHost.scss'
import { storage } from '../../../firebase'

class NewHost extends Component {

    state = {
        name: {
            value: '',
            isValid: null
        },
        twitter_name: {
            value: '',
            isValid: null
        },
        twitter_url: {
            value: '',
            isValid: null
        },
        bio: {
            value: '',
            isValid: null
        },
        podcastSelectOption: null,
        profile: {
            pic: null,
            url: null
        },
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

    updateValue = (event, field) => {
        this.setState({
            [field]: {
                ...this.state[field],
                value: event.target.value
            }
        })
    }

    handleBlur = (field) => {

        const isValid = formValidation.message(this.state[field].value);

        this.setState({
            [field]: {
                ...this.state[field],
                isValid
            }
        })
    }

    canSubmit = () => {
        const { name, twitter_name, twitter_url, bio, profile } = this.state
        return name.isValid && twitter_name.isValid && twitter_url.isValid && bio.isValid && profile.url
    }

    toggleCallback = () => {
        this.props.dispatch(hostAsyncActions.getUserHosts())
        this.props.toggleNewHost(false)
    }


    submitNewHost = () => {
        const data = {
            name: this.state.name.value,
            host_of_podcast: this.state.podcastSelectOption.value,
            twitter_name: this.state.twitter_name.value,
            twitter_url: this.state.twitter_url.value,
            bio: this.state.bio.value,
            image: this.state.profile.url,
        }
        this.props.dispatch((hostAsyncActions.submitNewHost(data, this.toggleCallback)))
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
                profile: {
                    ...this.state.profile,
                    pic: profile_pic
                }
            }, () => this.handleUpload())
        }   
    }

    handleUpload = () => {
    const { pic } = this.state.profile
       const uploadTask =  storage.ref(`profile/${pic.name}`).put(pic);
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
            storage.ref('profile').child(pic.name).getDownloadURL().then(profile_url => {
                console.log('type of url', typeof profile_url, profile_url)
                
                this.setState({
                    profile: {
                        ...this.state.profile,
                        url: profile_url
                    }
                })
            })
       },
    )
    }

    render() {

        const { name, twitter_name, twitter_url, bio, podcastSelectOption, profile } = this.state
        const { host } = this.props

        return (
            <div className='NewHost'>
                <div className="NewHost-details">
                    <section><h3>Add new host</h3></section>
                    <section className="NewHost-profilePic">
                        <p>Profile pic:</p>
                        <div className="NewHost-profilePicImageSelection">
                            <div className="NewHost-upload">
                                <section className="NewHost-uploadPreview">
                                {profile.url ? 
                                    <img src={profile.url}  alt='host profile'/>
                                    :
                                    <i className="fas fa-question" />
                                }
                                </section>
                                <section>
                                    <input type='file' onChange={this.handleChange}/>
                                </section>
                            </div>
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
                        <p>Name:</p> 
                        <Input 
                            value={name.value} 
                            onChange={(event) => this.updateValue(event, 'name')} 
                            onBlur={() => this.handleBlur('name')}
                            placeHolder='Your full name'
                        /> 
                    </section>
                    <section>
                        {name.isValid === false && <p className='error'>Please enter the host name</p>}
                    </section>

                    <section className="NewHost-twitterName">
                        <p>Twitter handle:</p> 
                        <Input 
                            value={twitter_name.value} 
                            onChange={(event) => this.updateValue(event, 'twitter_name')} 
                            onBlur={() => this.handleBlur('twitter_name')}
                            placeHolder='twitter_username1'
                        /> 
                    </section>
                    <section>
                        {twitter_name.isValid === false && <p className='error'>Please enter twitter handle</p>}
                    </section>

                    <section className="NewHost-twitterUrl">
                        <p>Twitter Url:</p> 
                        <Input 
                            value={twitter_url.value} 
                            onChange={(event) => this.updateValue(event, 'twitter_url')} 
                            onBlur={() => this.handleBlur('twitter_url')}
                            placeHolder='https://twitter.com/twitter_username1'
                        /> 
                     </section>
                     <section>
                        {twitter_url.isValid === false && <p className='error'>Please enter url to twitter profile</p>}
                    </section>

                    <section className="NewHost-bio">
                        <p>Bio:</p> 
                        <TextArea 
                            value={bio.value} 
                            onChange={(event) => this.updateValue(event, 'bio')} 
                            onBlur={() => this.handleBlur('bio')}
                        />
                    </section>
                    <section>
                        {bio.isValid === false && <p className='error'>Please provide a bio</p>}
                    </section>
                </div>
                <div className='NewHost-saveHost'>
                    <Button 
                        onClick={this.submitNewHost}
                        disabled={!this.canSubmit()}
                    >
                        Save New Host
                    </Button>
                </div>
                {host.newHostError &&
                    <section>
                        <p className='error'>There was an error adding this host. Please check details and try again.</p>
                    </section>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        podcast: state.podcast,
        host: state.host
    }
}

export default connect(mapStateToProps)(NewHost)