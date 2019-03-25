import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AuthenticationForm, Input } from '../../'
import { FORM } from '../../../constants'
import { Redirect } from 'react-router-dom';
import userAsyncActions from '../../../redux/actions/user/asyncActions'
import { INPUT_TYPES } from '../../../constants/index'
import './Register.scss'

class Register extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }

    updateFirstName = (event) => {
        this.setState({
            firstName: event
        })
    }

    updateLastName = (event) => {
        this.setState({
            lastName: event
        })
    }

    updateEmail = (event) => {
        this.setState({
            email: event
        })  
    }

    updatePassword = (event) => {
        this.setState({
            password: event
        })  
    }

    submitRegister = (e) => {
        const { firstName, lastName, email, password } = this.state
        e.preventDefault()
        this.props.dispatch((userAsyncActions.submitRegister(firstName, lastName, email, password)))
    }

    render() {

        if (this.props.user.redirectToDashboard === true) {
            return <Redirect to='/dashboard'/>
        }

        return (
                <div className='Register'>
                    <AuthenticationForm 
                        header='Register' 
                        classes='Register-form'
                        formType={FORM.TYPE.AUTHENTICATION}
                        buttonCta='Register'
                        buttonAction={this.submitRegister}
                    >
                        <section className='field fieldTwo'>
                            <label>First name</label> 
                            <Input onChange={this.updateFirstName}/>
                        </section>
                        <section className='field fieldTwo'>
                            <label>Last Name</label> 
                            <Input onChange={this.updateLastName}/>
                        </section>
                        <section className='field fieldTwo'>
                            <label>Email</label> 
                            <Input onChange={this.updateEmail} />
                        </section>
                        <section className='field fieldTwo'>
                            <label>Password</label> 
                            <Input 
                                onChange={this.updatePassword}
                                type={INPUT_TYPES.PASSWORD}
                            />
                        </section>
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