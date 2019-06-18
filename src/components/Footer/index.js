import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import './Footer.scss'

class Footer extends Component {

  render() {

    return (
            <footer className='Footer'>
                <div className='Footer-inner'>
                   <Link to='/newsletter'>Newsletter</Link>
                  <a href='https://twitter.com/platfore_app' target='_blank' rel="noopener noreferrer">@platfore_app</a>
                  <Link to='/beta'>Beta</Link>
                  <Link to='/contact'>Contact Us</Link>
                  <div className='Footer-blog'><Link to='/blog'>Blog</Link></div>
                </div>
            </footer>
    );
  }
}

export default Footer;
