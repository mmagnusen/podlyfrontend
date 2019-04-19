import React, { Component } from 'react';
import { Input, TextArea, Button } from '../../index'
import { connect } from 'react-redux'
import podcastAsyncActions from '../../../redux/actions/podcast/asyncActions'
import { formValidation } from '../../../utils/'
import './NewPodcast.scss'

class NewPodcast extends Component {

    state = {
        name: {
            value: '',
            isValid: null
        },
        slug: {
            value: '',
            isValid: null
        },
        start_date: {
            value: '',
            isValid: null
        },
        url: {
            value: '',
            isValid: null
        },
        description: {
            value: '',
            isValid: null
        },
        tags: {
            value: '',
            isValid: null
        }
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
        const { name, slug, tags, start_date, url, description } = this.state
        return name.isValid && slug.isValid && tags.isValid && start_date.isValid && url.isValid && description.isValid
    }

    toggleCallback = () => {
        this.props.dispatch(podcastAsyncActions.getUserPodcasts())
        this.props.toggleNewPodcast(false)

    }

    submitNewPodcast = () => {
        const { name, slug, tags, start_date, url, description } = this.state
        const data = ({
            name: name.value,
            slug: slug.value,
            tags: tags.value, 
            start_date: start_date.value, 
            url: url.value,
            description: description.value
        })
        this.props.dispatch((podcastAsyncActions.submitNewPodcast(data, this.toggleCallback)))
    }

    render() {

        const { name, slug, tags, start_date, url, description } = this.state
        const { podcast } = this.props;

        return (
                <div className='NewPodcast'>
                    <div className="NewPodcast-details">
                        <section><h3>Add new podcast</h3></section>
                        <section className="NewPodcast-name">
                            <p>Name:</p> 
                            <Input 
                                value={name.value} 
                                onChange={(event) => this.updateValue(event, 'name')} 
                                onBlur={() => this.handleBlur('name')}
                            /> 
                        </section>
                        <section>
                            {name.isValid === false && <p className='error'>Please enter the name of your podcast</p>}
                        </section>

                        <section className="NewPodcast-slug">
                            <p>Slug:</p> 
                            <Input 
                                value={slug.value} 
                                onChange={(event) => this.updateValue(event, 'slug')} 
                                onBlur={() => this.handleBlur('slug')}
                            /> 
                        </section>
                        <section>
                            {slug.isValid === false && <p className='error'>Please enter a url slug for your podcast.</p>}
                        </section>

                        <section className="NewPodcast-tags">
                            <p>Tags:</p> 
                            <Input 
                                value={tags.value} 
                                onChange={(event) => this.updateValue(event, 'tags')} 
                                onBlur={() => this.handleBlur('tags')}
                            />
                        </section>
                        <section>
                            {tags.isValid === false && <p className='error'>Please enter tags to describe your podcast</p>}
                        </section>

                        <section className="NewPodcast-age">
                            <p>Age:</p> 
                            <Input 
                                value={start_date.value} 
                                onChange={(event) => this.updateValue(event, 'start_date')} 
                                onBlur={() => this.handleBlur('start_date')}
                            />
                        </section>
                        <section>
                            {start_date.isValid === false && <p className='error'>Please state how long your podcast has been active.</p>}
                        </section>

                        <section className="NewPodcast-link">
                            <p>Link:</p> 
                            <Input 
                                value={url.value} 
                                onChange={(event) => this.updateValue(event, 'url')} 
                                onBlur={() => this.handleBlur('url')}
                            />
                        </section>
                        <section>
                            {url.isValid === false && <p className='error'>Please enter a link where your podcast can be found</p>}
                        </section>

                        <section className="NewPodcast-description">
                            <p>Description:</p>
                            <TextArea 
                                value={description.value} 
                                onChange={(event) => this.updateValue(event, 'description')} 
                                onBlur={() => this.handleBlur('description')}
                            />
                        </section>
                        <section>
                            {description.isValid === false && <p className='error'>Please enter a description for your podcast</p>}
                        </section>
                     
                    </div>
                    <div className='NewPodcast-save'>
                        <Button 
                            onClick={this.submitNewPodcast}
                            disabled={!this.canSubmit()}
                            >
                            Save changes
                        </Button>
                    </div>
                    {podcast.new.error &&
                        <section>
                            <p className='error'>There was an error creating your podcast. Please check details and try again.</p>
                        </section>
                    }
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

export default connect(mapStateToProps)(NewPodcast)