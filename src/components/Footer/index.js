import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import './Footer.scss'

class Footer extends Component {

  render() {

    return (
            <footer className='Footer'>
                <div className='Footer-inner'>
                  {/* <Link to='/blog'>Blog</Link> */}
                  <a href='https://twitter.com/platfore_app' target='_blank' rel="noopener noreferrer">@platfore_app</a>
                  <Link to='/beta'>Beta</Link>
                  <Link to='/contact'>Contact Us</Link>
                </div>
            </footer>
    );
  }
}

export default Footer;
