import React, { Component } from 'react';
import { connect } from 'react-redux'
import './TabDetails.scss'

class TabDetails extends Component {

    render() {

    const { user } = this.props

        return (
            <section className='TabDetails'>
                <section className='TabDetails-title'>
                    <h3>Your details</h3>
                </section>
                <section className='Dashboard-email'>
                    Email: { user.email }
                </section>
                <section className='Dashboard-email'>
                    First Name: { user.firstName }
                </section>
                <section className='Dashboard-email'>
                    Last Name: { user.lastName }
                </section>
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(TabDetails)

