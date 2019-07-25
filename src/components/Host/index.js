import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getDangerousHtml } from '../../utils';
import './Host.scss';

class Host extends Component {

    render() {
        const { name, bio, image, twitter_name, twitter_url } = this.props.host;
        
        return (
            <section className='Host'>
                <div className='Host-avatar'>
                    <img src={image} alt='host'/>
                    <div className='Host-avatarDetails'>
                        <h3>{name}</h3>
                        <a href={twitter_url} target='_blank' rel="noopener noreferrer">
                            <i class="fab fa-twitter"></i>
                            <p>{`@${twitter_name}`}</p>
                        </a>
                    </div>
                </div>
                <div className='Host-bio'>
                    <h3>Bio</h3>
                    <div dangerouslySetInnerHTML={getDangerousHtml(bio)}/>
                </div>
            </section>
        )    
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(withRouter(Host));