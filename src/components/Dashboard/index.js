import React, { Component } from 'react';
import { connect } from 'react-redux'
//tabs
import TabDetails from './tabs/TabDetails'
import TabPodcasts from './tabs/TabPodcasts'
import TabEpisodes from './tabs/TabEpisodes'
import TabHosts from './tabs/TabHosts'
import Modal from '@material-ui/core/Modal';
import { NewPodcast, EditPodcast, NewEpisode, EditEpisode,  NewHost, EditHost} from '../'
import { Redirect } from 'react-router-dom'
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
        const { newOpen, editOpen, newEpisodeOpen, episodeEditOpen, newHostOpen } = this.state

        if (user.token === null) {
            return <Redirect to='/'/>
        }

        return (
            <div className='Dashboard'>
                <div className='Dashboard-inner'>
                    <section className='Dashboard-navigation'>
                        <ul>
                            <li onClick={() => this.updateDashboardTab(0)}>Your details</li>
                            <li onClick={() => this.updateDashboardTab(1)}> Podcasts</li>
                            <li onClick={() => this.updateDashboardTab(2)}>Hosts</li>
                            {/* <li onClick={() => this.updateDashboardTab(3)}>Episodes</li> */}
                        </ul>
                    </section>

                    { user.dashboardTabIndex === 0 && <TabDetails />}
                    { user.dashboardTabIndex === 1 && <TabPodcasts toggleNewPodcast={this.toggleNewPodcast} toggleEditPodcast={this.toggleEditPodcast}/> }
                    { user.dashboardTabIndex === 2 && <TabHosts toggleNewHost={this.toggleNewHost} toggleEditHost={this.toggleEditHost}/>  }
                    { user.dashboardTabIndex === 3 && <TabEpisodes toggleNewEpisode={this.toggleNewEpisode} toggleEditEpisode={this.toggleEditEpisode}/>  }

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
                            <NewPodcast toggleNewPodcast={this.toggleNewPodcast}/>
                        </div>
                    </Modal>

                    <Modal
                        open={newEpisodeOpen}
                        onClose={this.toggleNewEpisode}
                    >
                        <div>
                            <NewEpisode toggleNewEpisode={this.toggleNewEpisode}/>
                        </div>
                    </Modal>

                    <Modal
                        open={episodeEditOpen}
                        onClose={this.toggleEditEpisode}
                    >
                        <div>
                            <EditEpisode toggleEditEpisode={this.toggleEditEpisode}/>
                        </div>
                    </Modal>

                    <Modal
                        open={newHostOpen}
                        onClose={this.toggleNewHost}
                    >
                    <div>
                        <NewHost toggleNewHost={this.toggleNewHost}/>
                    </div>
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