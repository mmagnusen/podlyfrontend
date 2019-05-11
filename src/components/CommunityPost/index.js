import React, { Component } from 'react';
import  avatar  from '../../resources/profile.jpg'
import moment from 'moment'
import './CommunityPost.scss'

class CommunityPost extends Component {

  render() {

    const { publish_date, title, post, first_name, last_name } = this.props.post

    const formattedDate = moment(publish_date).format("Do MMM YYYY")

    return (
            <div className='CommunityPost'>
                <div className='CommunityPost-image'>
                  <img src='https://loremflickr.com/100/100' alt='profile'/>
                </div>
                <div className='CommunityPost-content'>
                  <h3>{title}</h3>
                  <p>{`${first_name} ${last_name}`}{formattedDate}</p>
                  <p>{post}</p>
                </div>

            </div>
    );
  }
}

export default CommunityPost;
