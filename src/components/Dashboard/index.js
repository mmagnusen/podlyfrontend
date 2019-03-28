import React, { Component } from 'react';
import { connect } from 'react-redux'
import { UserPodcast } from '../index'
import Modal from '@material-ui/core/Modal';
import { EditPodcast, NewPodcast } from '../'
import { Redirect } from 'react-router-dom'
import userAsyncActions from '../../redux/actions/user/asyncActions'
import './Dashboard.scss'

class DashboardHome extends Component {

    state = {
        newOpen: false
    }

    componentDidMount() {
        //this.props.dispatch(userAsyncActions.getUserPodcasts())
    }

    toggleNewPodcast = (open) => {
        this.setState({
            newOpen: open
        })
    }
    render() {
        const firstName = localStorage.getItem('firstName')
        const lastName = localStorage.getItem('lastName')
        const email = localStorage.getItem('email')
        const token = localStorage.getItem('token')

        const { user, reduxPodcast } = this.props
        const { newOpen } = this.state

        // if (user.isLoggedIn === false) {
        //     return <Redirect to='/'/>
        // }

        return (
                <div className='Dashboard'>
                   <h1>Dashboard </h1>
                   <section className='Dashboard-email'>
                        email: { email }
                   </section>
                   <section className='Dashboard-email'>
                        first Name: { firstName }
                    </section>
                    <section className='Dashboard-email'>
                        lastName: { lastName }
                    </section>
                    <section className='Dashboard-email'>
                        token: { token }
                    </section>
                   <section className='Dashboard-addPodcast'>
                        <button onClick={() => this.toggleNewPodcast(true)}>Add new podcast</button>
                   </section>

                    
                    <section className='Dashboard-yourPodcasts'>
                        <section className='Dashboard-yourPodcastsTitle'>
                            <h3>Your podcasts</h3>
                        </section>
                        { reduxPodcast.podcasts && reduxPodcast.podcasts.map((podcast) => (
                            <UserPodcast 
                                key={podcast.name} 
                                editOpen={podcast.editOpen} 
                                podcast={podcast}
                            />
                        ))}
                    </section>

                    { reduxPodcast.editOpen === true && 
                        (<Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={reduxPodcast.editOpen}
                            onClose={this.handleClose}
                        >
                            <div>
                                <EditPodcast />
                            </div>
                        </Modal>
                    )}

                    { newOpen === true && 
                        (<Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={newOpen}
                            onClose={() => this.toggleNewPodcast(false)}
                        >
                            <div>
                                <NewPodcast toggleNewPodcast={this.toggleNewPodcast}/>
                            </div>
                        </Modal>
                    )}
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        reduxPodcast: state.podcast
    }
}

export default connect(mapStateToProps)(DashboardHome)