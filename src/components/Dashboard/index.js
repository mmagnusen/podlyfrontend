import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
//tabs
import TabDetails from './tabs/TabDetails'
import TabPodcasts from './tabs/TabPodcasts'
import TabEpisodes from './tabs/TabEpisodes'
import TabHosts from './tabs/TabHosts'
import Modal from '@material-ui/core/Modal';
import { NewPodcast, EditPodcast, NewEpisode, EditEpisode,  NewHost, EditHost, NavigationItems } from '../'

import podcastAsyncActions from '../../redux/actions/podcast/asyncActions'
import userActionGenerators from '../../redux/actions/user/userActionGenerators'
import './Dashboard.scss'

class DashboardHome extends Component {

    state = {
        newOpen: false,
        editOpen: false,

        newEpisodeOpen: false,
        episodeEditOpen: false,

        newHostOpen: false,
        hostEditOpen: false,
    }

    componentDidMount() {
        this.props.dispatch(podcastAsyncActions.getUserPodcasts())
    }

    toggleNewPodcast = () => {
        this.setState({
            newOpen: !this.state.newOpen
        })
    }

    toggleNewEpisode = () => {
        this.setState({
            newEpisodeOpen: !this.state.newEpisodeOpen
        })
    }

    toggleNewHost = () => {
        this.setState({
            newHostOpen: !this.state.newHostOpen
        })
    }

    toggleEditPodcast = () => {
        this.setState({
            editOpen: !this.state.editOpen
        })
    }

    toggleEditHost = () => {
        this.setState({
            hostEditOpen: !this.state.hostEditOpen
        })
    }

    toggleEditEpisode = () => {
        this.setState({
            episodeEditOpen: !this.state.episodeEditOpen
        })
    }

    updateDashboardTab = (newTabIndex) => {
        this.props.dispatch(userActionGenerators.updateTabIndex(newTabIndex))
    }

    render() {

        const { user } = this.props
        const { newOpen, editOpen, newEpisodeOpen, episodeEditOpen, newHostOpen, hostEditOpen } = this.state

        if (user.token === null) {
            return <Redirect to='/'/>
        }

        return (
            <div className='Dashboard'>
                <div className='Dashboard-inner'>
                    <section className='Dashboard-deskopNavigation'>
                        <NavigationItems />
                    </section>

                    { user.dashboardTabIndex === 0 && <TabDetails />}
                    { user.dashboardTabIndex === 1 && <TabPodcasts toggleNewPodcast={this.toggleNewPodcast} toggleEditPodcast={this.toggleEditPodcast}/> }
                    { user.dashboardTabIndex === 2 && <TabHosts toggleNewHost={this.toggleNewHost} toggleEditHost={this.toggleEditHost}/>  }
                    { user.dashboardTabIndex === 3 && <TabEpisodes toggleNewEpisode={this.toggleNewEpisode} toggleEditEpisode={this.toggleEditEpisode}/>  }

                    <Modal
                        open={editOpen}
                        onClose={this.toggleEditPodcast}
                        className='Platfore-modal'
                    >
                        <div>
                            <EditPodcast toggleEditPodcast={this.toggleEditPodcast}/>
                        </div>
                    </Modal>
                
                    <Modal
                        open={newOpen}
                        onClose={this.toggleNewPodcast}
                        className='Platfore-modal'
                    >
                        <div>
                            <NewPodcast toggleNewPodcast={this.toggleNewPodcast}/>
                        </div>
                    </Modal>

                    <Modal
                        open={newEpisodeOpen}
                        onClose={this.toggleNewEpisode}
                        className='Platfore-modal'
                    >
                        <div>
                            <NewEpisode toggleNewEpisode={this.toggleNewEpisode}/>
                        </div>
                    </Modal>

                    <Modal
                        open={episodeEditOpen}
                        onClose={this.toggleEditEpisode}
                        className='Platfore-modal'
                    >
                        <div>
                            <EditEpisode toggleEditEpisode={this.toggleEditEpisode}/>
                        </div>
                    </Modal>

                    <Modal
                        open={newHostOpen}
                        onClose={this.toggleNewHost}
                        className='Platfore-modal'
                    >
                    <div>
                        <NewHost toggleNewHost={this.toggleNewHost}/>
                    </div>
                    </Modal>

                    <Modal
                        open={hostEditOpen}
                        onClose={this.toggleEditHost}
                        className='Platfore-modal'
                    > 
                        <EditHost toggleEditHost={this.toggleEditHost}/>
                    </Modal>

                </div>
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