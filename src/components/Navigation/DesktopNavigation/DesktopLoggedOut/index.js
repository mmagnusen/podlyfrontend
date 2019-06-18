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
                <Link to="/blog"><h4>Blog</h4></Link>
                <Link to="/newsletter"><h4>Newsletter</h4></Link>
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
