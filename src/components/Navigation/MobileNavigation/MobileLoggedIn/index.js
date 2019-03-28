import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import userAsyncActions from '../../../redux/actions/user/asyncActions'
import './LoggedIn.scss'

class LoggedIn extends Component {

  handleLogout = () => {
    this.props.dispatch((userAsyncActions.handleLogout()))
  }

  render() {
    return (
      <div className="LoggedIn">
        <section  className="LoggedIn-logo">
          <Link to="/"><h1>Podcasts</h1></Link>
        </section>
        <section className="LoggedIn-middle">
            <h3>Connecting podcasts with engaging guests</h3>
        </section>
        <section className="LoggedIn-authenticate">
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

export default connect(mapStateToProps)(LoggedIn);