import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AuthenticationForm, Input } from '../../'
import { Redirect } from 'react-router-dom'
import { FORM, INPUT_TYPE } from '../../../constants/'
import userAsyncActions from '../../../redux/actions/user/asyncActions'
import './Login.scss'

 class Login extends Component {

     state = {
        email: '',
        password: '',
    }

     updateEmail = (event) => {
        this.setState({
            email: event.target.value
        })  
    }

     updatePassword = (event) => {
        this.setState({
            password: event.target.value
        })  
    }

     submitLogin = (e) => {
        e.preventDefault()
        this.props.dispatch(userAsyncActions.submitLogin(this.state.email, this.state.password))
    }

     render() {

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
                >
                <section className='field fieldTwo'>
                    <label>Email</label> 
                    <Input 
                        onChange={this.updateEmail} 
                        type={INPUT_TYPE.EMAIL}
                        />
                </section>
                <section className='field fieldTwo'>
                    <label>Password</label> 
                    <Input 
                        onChange={this.updatePassword} 
                        type={INPUT_TYPE.PASSWORD}
                    />
                </section>
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