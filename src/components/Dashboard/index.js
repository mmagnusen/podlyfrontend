import React, { Component } from 'react';
import { connect } from 'react-redux'
import { UserPodcast } from '../index'
import Modal from '@material-ui/core/Modal';
import { EditPodcast, NewPodcast } from '../'
import { Redirect } from 'react-router-dom'
import podcastAsyncActions from '../../redux/actions/podcast/asyncActions'
import './Dashboard.scss'

class DashboardHome extends Component {

    state = {
        newOpen: false,
        editOpen: false
    }

    componentDidMount() {
        this.props.dispatch(podcastAsyncActions.getUserPodcasts())
    }

    toggleNewPodcast = () => {
        this.setState({
            newOpen: !this.state.newOpen
        })
    }

    toggleEditPodcast = () => {
        this.setState({
            editOpen: !this.state.editOpen
        })
    }
    render() {
        const firstName = localStorage.getItem('firstName')
        const lastName = localStorage.getItem('lastName')
        const email = localStorage.getItem('email')
        const token = localStorage.getItem('token')
        const isLoggedIn =  localStorage.getItem('isLoggedIn')

        const { reduxPodcast } = this.props
        const { newOpen, editOpen } = this.state

        if (isLoggedIn === false) {
            return <Redirect to='/'/>
        }

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
                                podcast={podcast}
                                toggleEditPodcast={this.toggleEditPodcast}
                            />
                        ))}
                    </section>

                        <Modal
                            open={editOpen}
                            onClose={this.toggleEditPodcast}
                        >
                            <div>
                                <EditPodcast toggleEditPodcast={this.toggleEditPodcast}/>
                            </div>
                        </Modal>
                    

                        <Modal
                            open={newOpen}
                            onClose={this.toggleNewPodcast}
                        >
                            <div>
                                <NewPodcast />
                            </div>
                        </Modal>
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