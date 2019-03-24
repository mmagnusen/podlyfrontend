import React, { Component } from 'react';
import { Layout } from '../../'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './Dashboard.scss'

class DashboardHome extends Component {

    render() {
        const firstName = localStorage.getItem('firstName')
        const lastName = localStorage.getItem('lastName')
        const email = localStorage.getItem('email')

        // if (this.props.user.isLoggedIn === false) {
        //     return <Redirect to='/'/>
        // }

        return (
                <div className='Dashboard'>
                   <h1>dashboard Home</h1>
                   first name: { firstName }
                   last name: { lastName }
                   email: { email }
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(DashboardHome)