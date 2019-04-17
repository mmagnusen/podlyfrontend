import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AuthenticationForm, Input } from '../../'
import { FORM } from '../../../constants'
import { Redirect } from 'react-router-dom';
import userAsyncActions from '../../../redux/actions/user/asyncActions'
import { INPUT_TYPE } from '../../../constants/index'
import { formValidation } from '../../../utils/'
import './Register.scss'

class Register extends Component {

    state = {
        firstName: {
            value: '',
            isValid: null
        },
        lastName: {
            value: '',
            isValid: null
        },
        email: {
            value: '',
            isValid: null
        },
        password: {
            value: '',
            isValid: null
        },
        formError: null,
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
        const { firstName, lastName, email, password } = this.state;
        return firstName.isValid && lastName.isValid && email.isValid && password.isValid
    }


    submitRegister = (e) => {
        const { firstName, lastName, email, password } = this.state
        e.preventDefault()
        const canSubmit = this.canSubmit()

        if ( canSubmit ) {
            this.props.dispatch((userAsyncActions.submitRegister(firstName.value, lastName.value, email.value, password.value)))
        } else {
            this.setState({ formError: true})
        }
    }

    render() {

        const { firstName, lastName, email, password } = this.state;

        if (this.props.user.token !== null) {
            return <Redirect to='/dashboard'/>
        }

        const { formError } = this.state;

        return (
            <div className='Register'>
                <AuthenticationForm 
                    header='Register' 
                    classes='Register-form'
                    formType={FORM.TYPE.AUTHENTICATION}
                    buttonCta='Register'
                    buttonAction={this.submitRegister}
                    canSubmit={this.canSubmit()}
                >
                    <section className='field fieldTwo'>
                        <label>First name</label> 
                        <Input 
                            onChange={(event) => this.updateValue(event, 'firstName')} 
                            onBlur={() => this.handleBlur('firstName')}
                            value={firstName.value}
                        />
                    </section>
                    <section>
                        {firstName.isValid === false && <p className='error'>Please enter your first name, without any special characters</p>}
                    </section>

                    <section className='field fieldTwo'>
                        <label>Last Name</label> 
                        <Input 
                            onChange={(event) => this.updateValue(event, 'lastName')}
                            onBlur={() => this.handleBlur('lastName')}
                            value={lastName.value}
                        />
                    </section>
                    <section>
                        {lastName.isValid === false && <p className='error'>Please enter your last name, without any special characters</p>}
                    </section>

                    <section className='field fieldTwo'>
                        <label>Email</label> 
                        <Input 
                            onChange={(event) => this.updateValue(event, 'email')}
                            onBlur={() => this.handleBlur('email')}
                            value={email.value}
                        />
                    </section>
                    <section>
                        {email.isValid === false && <p className='error'>Please enter your email</p>}
                    </section>

                    <section className='field fieldTwo'>
                        <label>Password</label> 
                        <Input 
                            onChange={(event) => this.updateValue(event, 'password')}
                            onBlur={() => this.handleBlur('password')}
                            type={INPUT_TYPE.PASSWORD}
                            value={password.value}
                        />
                    </section>
                    <section>
                        {password.isValid === false && <p className='error'>Password must be minimum 8 characters</p>}
                    </section>

                    {formError &&
                        <section>
                            <p className='error'>Please check all the fields are completed</p>
                        </section>
                    }
                </AuthenticationForm>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register)