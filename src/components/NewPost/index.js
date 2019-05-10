import React, { Component } from 'react';
import { Button, Input, RichText } from '../'
import { formValidation } from '../../utils/'
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

    submitNewPost = () => {
        this.setState({
            loading: true,
        })
    }

    render() {

    const { title, loading } = this.state

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
                    </form>
            </div>
    );
  }
}

export default NewPost;
