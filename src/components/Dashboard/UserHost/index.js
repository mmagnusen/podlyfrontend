

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from '../../'
import hostActionGenerators from '../../../redux/actions/host/hostActionGenerators'
import { getDangerousHtml } from '../../../utils' 
import './UserHost.scss'

class UserHost extends Component {

    openEditModal = () => {
        this.props.dispatch((hostActionGenerators.updateEditModalOpen(this.props.host)))
        this.props.toggleEditHost()
    }

    render() {

    const { name, twitter_name, twitter_url, bio } = this.props.host
    const bioHtml = getDangerousHtml(bio)

        return (
            <section className='UserHost'>
                <section className='UserHost-detail'>
                    <p>Name:</p> 
                    <p>{name}</p> 
                </section>
                <section className='UserHost-detail'>
                    <p>Twitter Handle:</p> 
                    <p>{twitter_name}</p> 
                </section>
                <section className='UserHost-detail'>       
                    <p>snippet:</p> 
                    <p>{twitter_url}</p> 
                </section>
                <section className='UserHost-bio'>       
                    <p>Bio:</p> 
                    <div dangerouslySetInnerHTML={bioHtml}/>
                </section>
                <section className='UserHost-edit'>
                    <Button onClick={this.openEditModal}>Edit host profile</Button>
                 </section>
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reduxHhost: state.host
    }
}

export default connect(mapStateToProps)(UserHost)

