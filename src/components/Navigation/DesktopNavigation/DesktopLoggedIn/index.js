import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { DropdownMenu } from '../../../'
import './DesktopLoggedIn.scss'

class DesktopLoggedIn extends Component {

  render() {

    return (
      <div className="DesktopLoggedIn">
        <section  className="DesktopLoggedIn-logo">
          <Link to="/"><h1>Platfore</h1></Link>
        </section>
        <section className="DesktopLoggedIn-middle">
          <Link to="/community"><h4>Community</h4></Link>
        </section>
        <section className="DesktopLoggedIn-profile">
            <DropdownMenu />
        </section>
      </div>
    );
  }
}

export default DesktopLoggedIn;