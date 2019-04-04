

import React, { Component } from 'react';
import { connect } from 'react-redux'
import './UserEpisode.scss'

class UserEpisode extends Component {

    render() {

    const { name, slug, snippet, publish_date } = this.props.episode

        return (
            <section className='UserEpisode'>
                <section className='UserEpisode-detail'>
                    <p>title:</p> 
                    <p>{name}</p> 
                </section>
                <section className='UserEpisode-detail'>
                    <p>slug:</p> 
                    <p>{slug}</p> 
                </section>
                <section className='UserEpisode-detail'>       
                    <p>snippet:</p> 
                    <p>{snippet}</p> 
                </section>
                <section className='UserEpisode-detail'>       
                    <p>Publish Date:</p> 
                    <p>{publish_date}</p> 
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

export default connect(mapStateToProps)(UserEpisode)

