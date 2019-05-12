import React, { Component } from 'react';
import { Input, RichText, Button } from '../../index'
import { connect } from 'react-redux'
import hostAsyncActions from '../../../redux/actions/host/asyncActions'
import { formValidation } from '../../../utils/'
import './EditHost.scss'
import { storage } from '../../../firebase'

class EditHost extends Component {

    constructor(props) {
        super(props)

        const { name, twitter_name, twitter_url, bio, image } = this.props.currentHost
        this.state = {
            name: {
                value: name,
                isValid: true
            },
            twitter_name: {
                value: twitter_name,
                isValid: true
            },
            twitter_url: {
                value: twitter_url,
                isValid: true
            },
            bio: {
                value: bio,
                isValid: true
            },
            podcastSelectOption: null,
            profile: {
                pic: null,
                url: image
            },
        }
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

    updateValue = (value, field) => {
        this.setState({
            [field]: {
                ...this.state[field],
                value
            }
        })
    }

    handleBlur = (field) => {
        
        let isValid;

        if (field === 'bio') {
            isValid = formValidation.richText(this.state[field].value)
        } else {
            isValid = formValidation.message(this.state[field].value)
        }

        this.setState({
            [field]: {
                ...this.state[field],
                isValid,
            }
        })
    }

    canSubmit = () => {
        const { name, twitter_name, twitter_url, bio, profile } = this.state
        return name.isValid && twitter_name.isValid && twitter_url.isValid && bio.isValid && profile.url
    }

    toggleCallback = () => {
        this.props.dispatch(hostAsyncActions.getUserHosts())
        this.props.toggleEditHost(false)
    }


    submitChanges = () => {
        const data = {
            name: this.state.name.value,
            twitter_name: this.state.twitter_name.value,
            twitter_url: this.state.twitter_url.value,
            bio: this.state.bio.value,
            image: this.state.profile.url,
        }
        this.props.dispatch((hostAsyncActions.submitChanges(data, this.toggleCallback)))
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

        const { name, twitter_name, twitter_url, bio, profile } = this.state
        const { reduxHost } = this.props

        return (
            <div className='EditHost'>
            <div className="EditHost-details">
                <section><h3>Edit host</h3></section>
                <section className="EditHost-profilePic">
                    <p>Profile pic:</p>
                    <div className="EditHost-profilePicImageSelection">
                        <div className="EditHost-upload">
                            <section className="EditHost-uploadPreview">
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
                <section className="EditHost-name">
                    <p>Name:</p> 
                    <Input 
                        value={name.value} 
                        onChange={(event) => this.updateValue(event.target.value, 'name')} 
                        onBlur={() => this.handleBlur('name')}
                    /> 
                </section>
                <section>
                    {name.isValid === false && <p className='error'>Please enter the host name</p>}
                </section>

                <section className="EditHost-twitterName">
                    <p>Twitter handle:</p> 
                    <Input 
                        value={twitter_name.value} 
                        onChange={(event) => this.updateValue(event.target.value, 'twitter_name')} 
                        onBlur={() => this.handleBlur('twitter_name')}
                    /> 
                </section>
                <section>
                    {twitter_name.isValid === false && <p className='error'>Please enter twitter handle</p>}
                </section>

                <section className="EditHost-twitterUrl">
                    <p>Twitter Url:</p> 
                    <Input 
                        value={twitter_url.value} 
                        onChange={(event) => this.updateValue(event.target.value, 'twitter_url')} 
                        onBlur={() => this.handleBlur('twitter_url')}
                    /> 
                 </section>
                 <section>
                    {twitter_url.isValid === false && <p className='error'>Please enter url to twitter profile</p>}
                </section>

                <section className="EditHost-bio">
                    <p>Bio:</p> 
                    <RichText 
                        editorState={bio.value} 
                        onChange={(value) => this.updateValue(value, 'bio')} 
                        onBlur={() => this.handleBlur('bio')}
                    />
                </section>
                <section>
                    {bio.isValid === false && <p className='error'>Please provide a bio</p>}
                </section>
            </div>
            <div className='EditHost-saveHost'>
                <Button 
                    onClick={this.submitChanges}
                    disabled={!this.canSubmit()}
                >
                    Save changes
                </Button>
            </div>
            {reduxHost.editHostError &&
                <section>
                    <p className='error'>There was an error making changes to this host. Please check details and try again.</p>
                </section>
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        currentHost: state.host.currentHost,
        reduxHost: state.host,
        podcast: state.podcast,
    }
}

export default connect(mapStateToProps)(EditHost)