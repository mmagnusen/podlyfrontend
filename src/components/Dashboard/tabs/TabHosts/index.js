import React, { Component } from 'react';
import { connect } from 'react-redux'
import hostAsyncActions from '../../../../redux/actions/host/asyncActions'
import UserHost from './../../UserHost'
import { Button } from '../../../'
import './TabHosts.scss'

class TabHosts extends Component {
    componentDidMount() {
        this.props.dispatch(hostAsyncActions.getUserHosts())
    }

    render() {
        const { toggleNewHost } = this.props
        const { userHosts } = this.props.host

        return (
            <section className='TabHosts'>
                <section className='TabHosts-title'>
                    <h3>Your Host Profiles</h3>
                    <Button onClick={() => toggleNewHost(true)}>Create new host</Button>
                </section>
                { userHosts.map((host) => (
                    <UserHost
                        key={host.name} 
                        host={host}
                        toggleEditHost={this.props.toggleEditHost}
                />)) }
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        episode: state.episode,
        host: state.host
    }
}

export default connect(mapStateToProps)(TabHosts)

