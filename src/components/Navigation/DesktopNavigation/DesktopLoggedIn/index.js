import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import { Button } from '../../../'
import userActionGenerators from '../../../../redux/actions/user/userActionGenerators'
import './DesktopLoggedIn.scss'

class DesktopLoggedIn extends Component {

  handleLogout = () => {
    this.props.dispatch(userActionGenerators.handleLogout())
  }

  render() {
    return (
      <div className="DesktopLoggedIn">
        <section  className="DesktopLoggedIn-logo">
          <Link to="/"><h1>Platfore</h1></Link>
        </section>
        <section className="DesktopLoggedIn-middle">
          <Link to="/community"><h4>Community</h4></Link>
        </section>
        <section className="DesktopLoggedIn-authenticate">
            <Link to='/dashboard'>
              <Button>Dashboard</Button>
            </Link>
            <Button onClick={this.handleLogout}>Logout</Button>
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

export default connect(mapStateToProps)(DesktopLoggedIn);