import React, { Component } from 'react';
import axios from 'axios'
import { Input, Button } from '../'
import { INPUT_TYPE, ENDPOINT } from '../../constants/'
import { formValidation } from '../../utils/'
import './NewsLetter.scss'

class NewsLetter extends Component {
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
        return name.isValid && email.isValid
    }

    render() {

        const { email, name, error, submitted, loading } = this.state

        return (
        <section className='NewsLetter'>
            <div className='NewsLetter-header'>
                <h1>Sign-up for Newsletter</h1>
                <section className='NewsLetter-signup'>
                    <h3>Get the information you need to create and grow your podcast.</h3>
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
                    <Button class="button" onClick={this.submitNewsLetter} loading={loading}>Join the community</Button>
                    {submitted && (
                        <div className='NewsLetter-success'>
                            <h3>Thankyou. Please check your email!</h3>
                        </div>
                    )}
                    {error && (
                        <div className='NewsLetter-error'>
                            <h3>There has been an error. Please try again.</h3>
                        </div>
                    )}
                </section>
            </div>
            <div className='NewsLetter-filler'>
            </div>
        </section>
        )
    }
}

export default NewsLetter
