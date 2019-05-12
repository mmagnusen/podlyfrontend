import React, { Component } from 'react';
import  avatar  from '../../resources/profile.jpg'
import './Reply.scss'

class Reply extends Component {

  render() {

    const {name, message, date,} = this.props.reply

    return (
      <div className='Reply'>
        <div className='Reply-image'>
            <img src={avatar} alt='profile'/>
        </div>
        <div className='Reply-content'>
            <div className='Reply-details'>
                <p className='Reply-name'>{name}</p>
                <p className='Reply-date'>{date}</p> 
            </div>
            <div className='Reply-message'>
                <p>{message}</p>
            </div>
        </div>
   
      </div>
    );
  }
}

export default Reply;
