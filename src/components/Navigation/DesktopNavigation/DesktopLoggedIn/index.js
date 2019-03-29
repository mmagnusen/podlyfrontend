import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import userAsyncActions from '../../../../redux/actions/user/asyncActions'
import './DesktopLoggedIn.scss'

class DesktopLoggedIn extends Component {

  handleLogout = () => {
    this.props.dispatch(userAsyncActions.handleLogout())
  }

  render() {
    return (
      <div className="DesktopLoggedIn">
        <section  className="DesktopLoggedIn-logo">
          <Link to="/"><h1>Podcasts</h1></Link>
        </section>
        <section className="DesktopLoggedIn-middle">
            <h3>Connecting podcasts with engaging guests</h3>
        </section>
        <section className="DesktopLoggedIn-authenticate">
            <button onClick={() => this.handleLogout()}>Logout</button>
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