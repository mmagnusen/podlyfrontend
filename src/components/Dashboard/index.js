import React, { Component } from 'react';
import { connect } from 'react-redux'
//tabs
import TabDetails from './tabs/TabDetails'
import TabPodcasts from './tabs/TabPodcasts'
import TabEpisodes from './tabs/TabEpisodes'
import Modal from '@material-ui/core/Modal';
import { EditPodcast, NewPodcast, NewEpisode, EditEpisode } from '../'
import { Redirect } from 'react-router-dom'
import podcastAsyncActions from '../../redux/actions/podcast/asyncActions'
import userActionGenerators from '../../redux/actions/user/userActionGenerators'
import './Dashboard.scss'

class DashboardHome extends Component {

    state = {
        newOpen: false,
        editOpen: false,
        newEpisodeOpen: false,
        episodeEditOpen: false
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
        const { newOpen, editOpen, newEpisodeOpen, episodeEditOpen } = this.state

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
                            <li onClick={() => this.updateDashboardTab(2)}>Episodes</li>
                        </ul>
                    </section>

                    { user.dashboardTabIndex === 0 && <TabDetails />}
                    { user.dashboardTabIndex === 1 && <TabPodcasts toggleNewPodcast={this.toggleNewPodcast} toggleEditPodcast={this.toggleEditPodcast}/> }
                    { user.dashboardTabIndex === 2 && <TabEpisodes toggleNewEpisode={this.toggleNewEpisode} toggleEditEpisode={this.toggleEditEpisode}/>  }

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