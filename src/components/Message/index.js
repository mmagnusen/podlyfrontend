import React, { Component } from 'react';
import  avatar  from '../../resources/profile.jpg'
import './Message.scss'

class Message extends Component {

  render() {

    const { user, date, title, text } = this.props.message

    return (
            <div className='Message'>
                <div className='Message-image'>
                  <img src={avatar} alt='profile'/>
                </div>
                <div className='Message-content'>
                  <h3>{title}</h3>
                  <p>{user.name}{date}</p>
                  <p>{text}</p>
                </div>

            </div>
    );
  }
}

export default Message;
