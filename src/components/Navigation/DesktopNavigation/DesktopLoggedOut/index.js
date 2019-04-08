import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import { Button } from '../../../'
import './DesktopLoggedOut.scss'

class DesktopLoggedOut extends Component {
  render() {
    return (
      <div className="DesktopLoggedOut">
        <section className="DesktopLoggedOut-logo">
            <Link to="/"><h1>Platfore</h1></Link>
        </section>
        <section className="DesktopLoggedOut-middle">
            <h3>Connecting podcasts with engaging guests</h3>
        </section>
        <section className="DesktopLoggedOut-authenticate">
            <Link to='/login'>
                <Button>Login</Button>
            </Link>
            <Link to='/register'>
                <Button>Register</Button>
            </Link>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(DesktopLoggedOut);
