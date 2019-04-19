import React, { Component } from 'react';
import axios from 'axios'
import { Input, TextArea, Button } from '../index'
import { formValidation } from '../../utils'
import { INPUT_TYPE } from '../../constants'
import './ContactHost.scss'

class ContactHost extends Component {
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
        submitted: false,
        error: false
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

    canSubmit = () => {
        const { name, email, message } = this.state;
        return name.isValid && email.isValid && message.isValid
    }


    submitForm = (event) => {
        event.preventDefault()   
        
        const data = {
            service_id: 'gmail',
            template_id: 'podly',
            user_id: 'user_4S2QFaThE0GDhqVGZhxLU',
            template_params: {
                'username': 'James',
                'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...',
                'from_name': this.state.name.value,
                'email': this.state.email.value,
                'message': this.state.message.value
            }
        }

        axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
        .then(() => {
            this.setState({ submitted: true})
            setTimeout(() => this.props.handleClose(), 2000);
        })
        .catch((error) => {
            this.setState({ error: true })
        })
    }



  render() {

    const { submitted, error, name, email, message } = this.state

    return (
          <form className="ContactHost">
            {!submitted && (
                <div>
                    <h1>Contact host</h1>
                    <section className='ContactHost-field'>
                        <label>Name:</label>  
                        <Input 
                            onChange={(event) => this.updateValue(event, 'name')}
                            onBlur={() => this.handleBlur('name')}
                            type={INPUT_TYPE.TEXT} 
                            value={name.value}
                        />
                    </section>
                    <section>
                        {name.isValid === false && <p className='error'>Please enter your name</p>}
                    </section>

                    <section className='ContactHost-field'>
                        <label>Email:</label>  
                        <Input 
                            onChange={(event) => this.updateValue(event, 'email')}
                            onBlur={() => this.handleBlur('email')}
                            type={INPUT_TYPE.EMAIL} 
                            value={email.value}
                            />
                    </section>
                    <section>
                        {email.isValid === false && <p className='error'>Please enter your email</p>}
                    </section>

                    <section className='ContactHost-field'>
                        <label>Message to host:</label>  
                        <TextArea 
                            onChange={(event) => this.updateValue(event, 'message')}
                            onBlur={() => this.handleBlur('message')}
                            value={message.value}
                        />
                    </section>
                    <section>
                        {message.isValid === false && <p className='error'>Your message cannot be empty</p>}
                    </section>

                    <section className='ContactHost-submit'>
                        <Button onClick={this.submitForm} disabled={!this.canSubmit()}>Submit</Button>
                    </section>
                </div>
            )}

            {submitted && (
                <div className='ContactHost-success'>
                    <h3>Your message has been sucessfully sent!</h3>
                </div>
            )}
            {error && (
                <div className='ContactHost-error'>
                    <p className='error'>There has been an error submitting your message. Please try again</p>
                </div>
            )}
          </form>
    );
  }
}

export default ContactHost;
