import React, { Component } from 'react';
import { Input, Button, RichText } from '../../';
import { connect } from 'react-redux'
import podcastAsyncActions from '../../../redux/actions/podcast/asyncActions';
import { formValidation } from '../../../utils/';
import './NewPodcast.scss';

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

        if (field === 'description') {
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
        const { name, slug, tags, start_date, url, description } = this.state;

        return name.isValid && slug.isValid && tags.isValid && start_date.isValid && url.isValid && description.isValid;
    }

    toggleCallback = () => {
        this.props.dispatch(podcastAsyncActions.getUserPodcasts());

        this.props.toggleNewPodcast(false);
    }

    submitNewPodcast = () => {
        const { name, slug, tags, start_date, url, description } = this.state;

        const data = ({
            name: name.value,
            slug: slug.value,
            tags: tags.value, 
            start_date: start_date.value, 
            url: url.value,
            description: description.value
        });

        this.props.dispatch((podcastAsyncActions.submitNewPodcast(data, this.toggleCallback)));
    }

    render() {

        const { name, slug, tags, start_date, url, description } = this.state;

        const { podcast } = this.props;

        return (
            <div className='NewPodcast'>
                <div className="NewPodcast-details">
                    <section><h3>Add new podcast</h3></section>
                    <section className="NewPodcast-name">
                        <p>Name:</p> 
                        <Input 
                            value={name.value} 
                            onChange={(event) => this.updateValue(event.target.value, 'name')} 
                            onBlur={() => this.handleBlur('name')}
                            placeHolder='name of your podcast'
                        /> 
                    </section>
                    <section>
                        {name.isValid === false && <p className='error'>Please enter the name of your podcast</p>}
                    </section>

                    <section className="NewPodcast-slug">
                        <p>Slug:</p> 
                        <Input 
                            value={slug.value} 
                            onChange={(event) => this.updateValue(event.target.value, 'slug')} 
                            onBlur={() => this.handleBlur('slug')}
                            placeHolder='name-of-your-podcast'
                        /> 
                    </section>
                    <section>
                        {slug.isValid === false && <p className='error'>Please enter a url slug for your podcast.</p>}
                    </section>

                    <section className="NewPodcast-tags">
                        <p>Tags:</p> 
                        <Input 
                            value={tags.value} 
                            onChange={(event) => this.updateValue(event.target.value, 'tags')} 
                            onBlur={() => this.handleBlur('tags')}
                            placeHolder='tech, software, design'
                        />
                    </section>
                    <section>
                        {tags.isValid === false && <p className='error'>Please enter tags to describe your podcast</p>}
                    </section>

                    <section className="NewPodcast-age">
                        <p>Age:</p> 
                        <Input 
                            value={start_date.value} 
                            onChange={(event) => this.updateValue(event.target.value, 'start_date')} 
                            onBlur={() => this.handleBlur('start_date')}
                            placeHolder='1 Year'
                        />
                    </section>
                    <section>
                        {start_date.isValid === false && <p className='error'>Please state how long your podcast has been active.</p>}
                    </section>

                    <section className="NewPodcast-link">
                        <p>Link:</p> 
                        <Input 
                            value={url.value} 
                            onChange={(event) => this.updateValue(event.target.value, 'url')} 
                            onBlur={() => this.handleBlur('url')}
                            placeHolder='https://anchor.fm/yourpodcast'
                        />
                    </section>
                    <section>
                        {url.isValid === false && <p className='error'>Please enter a link where your podcast can be found</p>}
                    </section>

                    <section className="NewPodcast-description">
                        <p>Description:</p>
                        <RichText 
                            onChange={(value) => this.updateValue(value, 'description') } 
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

export default connect(mapStateToProps)(NewPodcast);