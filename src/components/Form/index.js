import React, { Component } from 'react';
import axios from 'axios'
import './Form.scss'

class Form extends Component {
    state = {
        name: '',
        email: '',
        message: '',
        submitted: false,
        error: false
    }

    updateName = (event) => {
        this.setState({
            name: event.target.value
        }) 
    }

    updateEmail = (event) => {
        this.setState({
            email: event.target.value
        }) 
    }

    updateMessage = (event) => {
        this.setState({
            message: event.target.value
        }) 
    }

    submitForm = (event) => {
        event.preventDefault()   
        
        setTimeout(() => this.props.handleClose(), 1500);

        const data = {
            service_id: 'gmail',
            template_id: 'podly',
            user_id: 'user_4S2QFaThE0GDhqVGZhxLU',
            template_params: {
                'username': 'James',
                'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...',
                'from_name': this.state.name,
                'email': this.state.email,
                'message': this.state.message
            }
        }

        axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
        .then((response) => {
            console.log('response:', response)
            this.setState({ submitted: true})
        })
        .catch((error) => {
            this.setState({ error: true })
            console.log('error from email submission', error)
        })
    }

  render() {

    const { submitted, error } = this.state

    return (
          <form className="Form">
            {!submitted && (
                <div>
                    <h1>Contact host</h1>
                    <section className='Form-field'>
                        <label>Name:</label>  
                        <input onChange={this.updateName}/>
                    </section>
                    <section className='Form-field'>
                        <label>Email:</label>  
                        <input onChange={this.updateEmail}/>
                    </section>
                    <section className='Form-field'>
                        <label>Message to host:</label>  
                        <textarea onChange={this.updateMessage}/>
                    </section>
                    <section className='Form-submit'>
                        <button onClick={this.submitForm}>Submit</button>
                    </section>
                </div>
            )}

            {submitted && (
                <div className='Form-submitted'>
                    <h3>Your message has been sucessfully sent!</h3>
                </div>
            )}
            {error && (
                <div className='Form-submitted'>
                    <h3>There has been an error submitting your message. Please try again</h3>
                </div>
            )}
          </form>
    );
  }
}

export default Form;
