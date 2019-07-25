import React from 'react';

const HostThumbnail = ({ host }) => (
  <div>
    <img src='https://pbs.twimg.com/profile_images/1064506745924608001/Zy4wmix8_400x400.jpg' alt={host.name}/>
  </div>
);

export default HostThumbnail;
