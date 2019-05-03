import React, { Component } from 'react';
import { Input, Button, RichText } from '../../index'
import { connect } from 'react-redux'
import podcastAsyncActions from '../../../redux/actions/podcast/asyncActions'
import { formValidation } from '../../../utils/'
import './EditPodcast.scss'

class EditPodcast extends Component {

    constructor(props) {
        super(props)
        const { name, slug, tags, start_date, url, description } = this.props.currentPodcast

        this.state = {
            name: {
                value: name,
                isValid: true
            },
            slug: {
                value: slug,
                isValid: true
            },
            start_date: {
                value: start_date,
                isValid: true
            },
            url: {
                value: url,
                isValid: true
            },
            description: {
                value: description,
                isValid: true
            },
            tags: {
                value: tags,
                isValid: true
            }
        }
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

        const isValid = formValidation.message(this.state[field].value);

        this.setState({
            [field]: {
                ...this.state[field],
                isValid
            }
        })
    }

    canSubmit = () => {
        const { name, tags, start_date, url, description } = this.state
        return name.isValid && tags.isValid && start_date.isValid && url.isValid && description.isValid
    }

    toggleCallback = () => {
        this.props.toggleEditPodcast()
    }

    submitChanges = () => {

        const { name, slug, tags, start_date, url, description } = this.state

        const data = ({
            name: name.value,
            slug: slug.value,
            tags: tags.value, 
            start_date: start_date.value, 
            url: url.value,
            description: description.value
        })

        this.props.dispatch((podcastAsyncActions.submitChanges(data, this.toggleCallback)))
    }

    render() {

        const { name, tags, start_date, url, description } = this.state
        const { podcast } = this.props

        return (
                <div className='EditPodcast'>
                    <div className="EditPodcast-details">
                    <section><h3>Edit this podcast</h3></section>
                    <section className="EditPodcast-name">
                        <p>Name:</p> 
                        <Input 
                            value={name.value} 
                            onChange={(event) => this.updateValue(event.target.value, 'name')} 
                            onBlur={() => this.handleBlur('name')}
                        /> 
                    </section>
                    <section>
                        {name.isValid === false && <p className='error'>Please enter the name of your podcast</p>}
                    </section>

                    <section className="EditPodcast-tags">
                        <p>Tags:</p> 
                        <Input 
                            value={tags.value} 
                            onChange={(event) => this.updateValue(event.target.value, 'tags')} 
                            onBlur={() => this.handleBlur('tags')}
                        />
                    </section>
                    <section>
                        {tags.isValid === false && <p className='error'>Please enter tags to describe your podcast</p>}
                    </section>

                    <section className="EditPodcast-age">
                        <p>Age:</p> 
                        <Input 
                            value={start_date.value} 
                            onChange={(event) => this.updateValue(event.target.value, 'start_date')} 
                            onBlur={() => this.handleBlur('start_date')}
                        />
                    </section>
                    <section>
                        {start_date.isValid === false && <p className='error'>Please state how long your podcast has been active.</p>}
                    </section>

                    <section className="EditPodcast-link">
                        <p>Link to podcast:</p> 
                        <Input 
                            value={url.value} 
                            onChange={(event) => this.updateValue(event.target.value, 'url')} 
                            onBlur={() => this.handleBlur('url')}
                        />
                    </section>
                    <section>
                        {url.isValid === false && <p className='error'>Please enter a link where your podcast can be found</p>}
                    </section>

                    <section className="EditPodcast-description">
                        <p>Description:</p>
                        <RichText 
                            editorState={description.value} 
                            onChange={(value) => this.updateValue(value, 'description')} 
                        />
                    </section>
                    <section>
                        {description.isValid === false && <p className='error'>Please enter a description for your podcast</p>}
                    </section>

                    </div>
                    <div className='EditPodcast-submit'>
                        <Button 
                            onClick={this.submitChanges}
                            disabled={!this.canSubmit()}
                        >
                        Save changes
                        </Button>
                    </div>
                    {podcast.edit.error &&
                        <section>
                            <p className='error'>There was an error updating your podcast. Please check details and try again.</p>
                        </section>
                    }
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        currentPodcast: state.podcast.currentPodcast,
        podcast: state.podcast
    }
}

export default connect(mapStateToProps)(EditPodcast)