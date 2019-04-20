import React, { Component } from 'react';
import axios from 'axios'
import { Input, Button, TextArea } from '../'
import { INPUT_TYPE, ENDPOINT } from '../../constants/'
import { formValidation } from '../../utils/'
import './Contact.scss'

class Contact extends Component {
    state = {
        name: {
            value: '',
            isValid: null
        },
        email: {
            value: '',
            isValid: null
        },
        message: {
            value: '',
            isValid: null
        },
        error: false,
        submitted: false
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

        const isValid = formValidation[field](this.state[field].value);

        this.setState({
            [field]: {
                ...this.state[field],
                isValid
            }
        })
    }

    submitContact = (event) => {
        event.preventDefault()   
        const { host } = this.props
        const { name, email, message } = this.state;
        
        const data = ({
            "name": name.value,
            "email": email.value,
            "message": `
Hello,
                        
You have received a new contact form message.

Name: ${name.value}

Message: ${message.value}

Please reply to: ${email.value}

Best,
Platfore
                                    `,
        })

        axios.post(
            `${ENDPOINT}/api/contact`, 
            data
        )
        .then(() => {
            this.setState({ submitted: true})
        })
        .catch((error) => {
            this.setState({ error: true })
        })
    }

    canSubmit = () => {
        const { name, email, message } = this.state;
        return name.isValid && email.isValid && message.isValid
    }

    render() {

        const { email, name, message, error, submitted } = this.state

        return (
        <section className='Contact'>
            <div className='Contact-inner'>
                <p>Hello!</p>
                <p>Thankyou for visiting our contact us page. We'd love to hear from you, whether you've got suggestions, have any questions or just fancy a chat.</p>
                <p>Hit us up using the contact form below and we'll get back to you ASAP.</p>

                    <form>
                        <section>
                            <h3>Contact us</h3>
                        </section>

                        <section className='field fieldTwo'>
                            <label>Name</label> 
                            <Input 
                                onChange={(event) => this.updateValue(event, 'name')} 
                                onBlur={() => this.handleBlur('name')}
                                value={name.value}
                                type={INPUT_TYPE.TEXT}
                            />
                        </section>
                        <section>
                            {name.isValid === false && <p className='error'>Please enter your name</p>}
                        </section>

                        <section className='field fieldTwo'>
                            <label>Email</label> 
                            <Input 
                                onChange={(event) => this.updateValue(event, 'email')} 
                                onBlur={() => this.handleBlur('email')}
                                value={email.value}
                                type={INPUT_TYPE.EMAIL}
                            />
                        </section>
                        <section>
                            {email.isValid === false && <p className='error'>Please enter your email</p>}
                        </section>

                        <section className='field fieldTwo'>
                            <label>Message</label> 
                            <TextArea 
                                onChange={(event) => this.updateValue(event, 'message')} 
                                onBlur={() => this.handleBlur('message')}
                                value={message.value}
                            />
                        </section>
                        <section>
                            {message.isValid === false && <p className='error'>Please enter your message</p>}
                        </section>
                        <section className='Contact-submit'>
                            <Button disabled={!this.canSubmit()} onClick={this.submitContact}>Send message</Button>
                        </section>
                        {error && (
                            <section>
                                <p className='error'>There was an error sending your message. Please check and try again</p>
                            </section>
                        )}
                        {submitted === true && (
                            <div className='ContactHost-success'>
                                <h3>Your message has been successfully sent!</h3>
                            </div>
                        )}
                    </form>
            </div>
        </section>
        )
    }
}

export default Contact
