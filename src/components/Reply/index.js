import React, { Component } from 'react';
import  avatar  from '../../resources/profile.jpg'
import moment from 'moment'
import { getDangerousHtml } from '../../utils' 
import './Reply.scss'

class Reply extends Component {

  render() {

    const {first_name, last_name, content, publish_date,} = this.props.reply
    const formattedDate = moment(publish_date).format("Do MMM YYYY")

    return (
      <div className='Reply'>
        <div className='Reply-image'>
            <img src={avatar} alt='profile'/>
        </div>
        <div className='Reply-content'>
            <div className='Reply-details'>
                <p className='Reply-name'>{`${first_name} ${last_name}`}</p>
                <p className='Reply-date'>{formattedDate}</p> 
            </div>
            <div className='Reply-message'>
            <div dangerouslySetInnerHTML={getDangerousHtml(content)}/>
            </div>
        </div>
   
      </div>
    );
  }
}

export default Reply;
