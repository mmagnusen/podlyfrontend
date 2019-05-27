import React, { Component } from 'react';
import dog from '../../resources/dog.jpg'
import moment from 'moment'
import { getDangerousHtml } from '../../utils' 
import './Reply.scss'

class Reply extends Component {

  render() {

    const { content, publish_date, publisher } = this.props.reply
    const { first_name, last_name, profile } = publisher

    const formattedDate = moment(publish_date).format("Do MMM YYYY")

    return (
      <div className='Reply'>
        <div className='Reply-image'>
            <img src={ profile ? profile.image : dog} alt='profile'/>
        </div>
        <div className='Reply-details'>
            <p className='Reply-name'>{`${first_name} ${last_name}`}</p>
            <p className='Reply-date'>{formattedDate}</p> 
        </div>
        <div className='Reply-message'>
            <div dangerouslySetInnerHTML={getDangerousHtml(content)}/>
        </div>
      </div>
    );
  }
}

export default Reply;
