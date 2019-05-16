import React, { Component } from 'react';
import axios from 'axios'
import { Button, Input, RichText } from '../'
import { formValidation } from '../../utils/'
import communityAsyncActions from './../../redux/actions/community/asyncActions'
import { ENDPOINT } from '../../constants'
import { connect } from 'react-redux'
import './NewPost.scss'

class NewPost extends Component {

    state = {
        title: {
            value: '',
            isValid: null
        },
        post: {
            value: '',
            isValid: null
        },
        loading: false,
        submitted: false,
        error: null
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

        if (field === 'post') {
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
        const { title, post } = this.state
        return title.isValid && post.isValid
    }

    submitNewPost = (event) => {
        event.preventDefault()

        const { title, post } = this.state
        const { toggleNewPost } = this.props
 
        
        this.setState({
            loading: true,
        })

        const data = ({
            title: title.value,
            post: post.value
        })

        const token = localStorage.getItem('token');

        axios({
            method: 'post',
            url: `${ENDPOINT}/api/community_post`, 
            headers: {
                'Authorization': 'JWT '+ token
                },
            responseType: 'json',
            data
        })
        .then(() => {
            this.props.dispatch(communityAsyncActions.freshRequest())
            this.setState({ submitted: true, loading: false})
            toggleNewPost()
        })
        .catch((error) => {
            this.setState({
                loading: false,
                error: true 
            })
        })
    }

    render() {

    const { title, loading, error } = this.state

    return (
            <div className='NewPost'>
                    <form>
                        <section className='NewPost-title'>
                            <label>Title</label>
                            <Input 
                                value={title.value}
                                onChange={(event) => this.updateValue(event.target.value, 'title')}
                                onBlur={() => this.handleBlur('title')}
                            />
                        </section>
                        <section className='NewPost-post'>
                            <label>Post</label>
                            <RichText 
                                showMenu={true}
                                onChange={(value) => this.updateValue(value, 'post') } 
                                onBlur={() => this.handleBlur('post')}
                            />
                        </section>
                        <div className='NewPost-save'>
                            <Button 
                                onClick={this.submitNewPost}
                                disabled={!this.canSubmit()}
                                loading={loading}
                            >
                                Publish Post
                            </Button>
                        </div>
                        <div>
                            {error && <p className='error'>There was a problem submitting your post. Please try again.</p>}
                        </div>
                    </form>
            </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        communityPosts: state.community.communityPosts,
    }
}

export default connect(mapStateToProps)(NewPost);
