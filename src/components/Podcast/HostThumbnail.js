import React, { Component } from 'react';

class HostThumbnail extends Component {

  render() {

  const { name } = this.props.host
    return (
      <div>
        <img src='https://pbs.twimg.com/profile_images/1064506745924608001/Zy4wmix8_400x400.jpg' alt={name}/>
      </div>
    );
  }
}

export default HostThumbnail;
