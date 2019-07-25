import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button } from '../';
import { INPUT_TYPE, ENDPOINT } from '../../constants/';
import { formValidation } from '../../utils/';
import './NewsLetterCapture.scss';

class NewsLetterCapture extends Component {
    state = {
        name: {
            value: '',
            isValid: null
        },
        email: {
            value: '',
            isValid: null
        },
        error: false,
        submitted: false,
        loading: false
    }

    updateValue = (event, field) => {
        this.setState({
            error: false,
            [field]: {
                ...this.state[field],
                value: event.target.value
            }
        })
    }

    handleBlur = (field) => {

        const isValid = formValidation[field](this.state[field].value);

        this.setState({
            error: false,
            [field]: {
                ...this.state[field],
                isValid
            }
        })
    }

    submitNewsLetter = (event) => {
        event.preventDefault();

        const shouldSubmit = this.canSubmit();

        if (!shouldSubmit) {
            this.setState({
                error: true,
            })
            return;
        } else {
            this.setState({
                loading: true,
            }) 
        }
        const { name, email } = this.state;
        
        const data = ({
            "message": `Name: ${name.value}, Email: ${email.value} `,
        })

        axios.post(
            `${ENDPOINT}/api/beta`, 
            data
        )
        .then(() => {
            this.setState({ 
                submitted: true,
                loading: false
            })
        })
        .catch((error) => {
            this.setState({ 
                error: true,
                loading: false 
            })
        })
    }

    canSubmit = () => {
        const { name, email } = this.state;

        return name.isValid && email.isValid;
    }

    render() {

        const { email, name, error, submitted, loading } = this.state;

        return (
            <section className='NewsLetterCapture'>
                <h3>If you've enjoyed this article, sign-up to get more delivered directly to your inbox.</h3>
                <div className='NewsLetterCapture-inputs'>
                    <Input 
                        placeHolder='your name' 
                        value={name.value}
                        onChange={(event) => this.updateValue(event, 'name')}
                        onBlur={() => this.handleBlur('name')}
                    />
                    <Input 
                        type={INPUT_TYPE.EMAIL} 
                        value={email.value}
                        onChange={(event) => this.updateValue(event, 'email')}
                        onBlur={() => this.handleBlur('email')}
                    />
                    <Button class="button" onClick={this.submitNewsLetter} loading={loading}>Sign-up</Button>
                </div>
                {submitted && (
                    <div className='NewsLetterCapture-success'>
                        <p>Thankyou. Please check your email!</p>
                    </div>
                )}
                {error && (
                    <div className='NewsLetterCapture-error'>
                        <p>There has been an error. Please try again.</p>
                    </div>
                )}
            </section>
        )
    }
}

export default NewsLetterCapture;
