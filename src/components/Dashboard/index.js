import React, { Component } from 'react';
import { connect } from 'react-redux'
import { UserPodcast } from '../index'
import { Redirect } from 'react-router-dom'
import './Dashboard.scss'

class DashboardHome extends Component {

    state = {
        editOpen: true
    }

    handleOpen = () => {
        this.setState({
            editOpen: true 
        })
    }

    handleClose = () => {
        this.setState({
            editOpen: false 
        })
    }

    render() {
        const firstName = localStorage.getItem('firstName')
        const lastName = localStorage.getItem('lastName')
        const email = localStorage.getItem('email')

        const { user } = this.props
        const { editOpen } = this.state

        // if (user.isLoggedIn === false) {
        //     return <Redirect to='/'/>
        // }

        return (
                <div className='Dashboard'>
                   <h1>Dashboard </h1>
                   <section className='Dashboard-email'>
                        email: { email }
                   </section>

                    <section>
                    <h3>Your podcasts</h3>
                </section>
                    <section>
                        { user.podcasts && user.podcasts.map((podcast) => (
                            <UserPodcast 
                                key={podcast.name} 
                                podcast={podcast} 
                                editOpen={editOpen} 
                                handleOpen={this.handleOpen} 
                                handleClose={this.handleClose} 
                            />
                        ))}
                    </section>
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