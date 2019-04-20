import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import './Footer.scss'

class Footer extends Component {

  render() {

    return (
            <footer className='Footer'>
                <a href='https://twitter.com/platfore_app' target='_blank' rel="noopener noreferrer">@platfore_app</a>
                <Link to='/contact'>Contact us</Link>
            </footer>
    );
  }
}

export default Footer;
