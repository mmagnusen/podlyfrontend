import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AuthenticationForm, Input } from '../../'
import { Redirect } from 'react-router-dom'
import { FORM, INPUT_TYPE } from '../../../constants/'
import userAsyncActions from '../../../redux/actions/user/asyncActions'
import { formValidation } from '../../../utils/'
import './Login.scss'

 class Login extends Component {

     state = {
        email: {
            value: '',
            isValid: null
        },
        password: {
            value: '',
            isValid: null
        },
        formError: false,
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

     submitLogin = (e) => {
        e.preventDefault()
        this.props.dispatch(userAsyncActions.submitLogin(this.state.email.value, this.state.password.value))
    }

    canSubmit = () => {
        const { email, password } = this.state;
        return email.isValid && password.isValid
    }

     render() {

        const { email, password } = this.state;
        const { loginError } = this.props.user

         if (this.props.user.token !== null && this.props.podcast.podcasts !== null) {
            return <Redirect to='/dashboard'/>
        }

         return (
            <div className='Login'>
                <AuthenticationForm 
                    header='Login'
                    formType={FORM.TYPE.AUTHENTICATION}
                    buttonCta='Login'
                    buttonAction={this.submitLogin}
                    canSubmit={this.canSubmit()}
                >
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
                    <label>Password</label> 
                    <Input 
                        onChange={(event) => this.updateValue(event, 'password')} 
                        onBlur={() => this.handleBlur('password')}
                        value={password.value}
                        type={INPUT_TYPE.PASSWORD}
                    />
                </section>
                <section>
                    {password.isValid === false && <p className='error'>Password must be minimum 8 characters</p>}
                </section>
                {loginError && (
                    <section>
                        <p className='error'>{loginError}</p>
                    </section>
                )}
                </AuthenticationForm>
            </div>
        )
    }
}

 const mapStateToProps = (state) => {
    return {
        user: state.user,
        podcast: state.podcast
    }
}

 export default connect(mapStateToProps)(Login)