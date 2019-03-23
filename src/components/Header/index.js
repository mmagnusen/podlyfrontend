import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import './Header.scss'

class Header extends Component {
  render() {
    return (
      <div className="Header">
      <Link to="/"><h1>Podcasts</h1></Link>
        <h3>Connecting podcasts with engaging guests</h3>
      </div>
    );
  }
}

export default Header;
