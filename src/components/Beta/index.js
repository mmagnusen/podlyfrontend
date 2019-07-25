import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button } from '../';
import { INPUT_TYPE, ENDPOINT } from '../../constants/';
import { formValidation } from '../../utils/';
import './Beta.scss';

class Beta extends Component {
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
                value: event.target.value,
            }
        })
    }

    handleBlur = (field) => {

        const isValid = formValidation[field](this.state[field].value);

        this.setState({
            error: false,
            [field]: {
                ...this.state[field],
                isValid,
            }
        })
    }

    submitBeta = (event) => {
        event.preventDefault()   
        const shouldSubmit = this.canSubmit()
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

        const { email, name, error, submitted, loading } = this.state

        return (
            <section className='Beta'>
                <div className='Beta-header'>
                    <h1>Apply to join beta</h1>
                    <p>Supercharge your growth and monetize your podcast</p>
                    <section className='Beta-signup'>
                        <h3>We partner with selected industry brands to automatically play adverts during pre-defined points in your show</h3>
                        <Input 
                            type={INPUT_TYPE.EMAIL} 
                            value={email.value}
                            onChange={(event) => this.updateValue(event, 'email')}
                            onBlur={() => this.handleBlur('email')}
                        />
                        <section>
                            {email.isValid === false && <p className='error'>Please enter your email</p>}
                        </section>
                        <Input 
                            placeHolder='your name' 
                            value={name.value}
                            onChange={(event) => this.updateValue(event, 'name')}
                            onBlur={() => this.handleBlur('name')}
                        />
                        <section>
                            {name.isValid === false && <p className='error'>Please enter your name</p>}
                        </section>
                        <Button class="button" onClick={this.submitBeta} loading={loading}>Sign up</Button>
                        {submitted && (
                            <div className='Beta-success'>
                                <h3>Thankyou. Please check your email!</h3>
                            </div>
                        )}
                        {error && (
                            <div className='Beta-error'>
                                <h3>There has been an error. Please try again.</h3>
                            </div>
                        )}
                    </section>
                </div>
                <div className='Beta-filler'>
                </div>
                <div className='Beta-value'>
                    <div className='Beta-valueProposition'>
                        <i className="fas fa-dollar-sign" />
                        <p>Get paid monthly, directly into your bank account</p>
                    </div>
                    <div className='Beta-valueProposition'>
                        <i className="fas fa-play" />
                        <p>No minimum streaming numbers required</p>
                    </div>
                    <div className='Beta-valueProposition'>
                        <i className="fas fa-wrench" />
                        <p>The tools to create, grow and monetize your show</p>
                    </div>
                </div>

            </section>
        )
    }
}

export default Beta;
