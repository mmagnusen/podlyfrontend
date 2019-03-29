import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import userActionGenerators from '../../../../redux/actions/user/userActionGenerators'
import './MobileLoggedIn.scss'

class MobileLoggedIn extends Component {

  handleLogout = () => {
    this.props.dispatch(userActionGenerators.handleLogout())
  }

  render() {
    return (
      <div className="MobileLoggedIn">
        <section  className="MobileLoggedIn-logo">
          <Link to="/"><h1>Podcasts</h1></Link>
        </section>
        <section className="MobileLoggedIn-middle">
            <h3>Connecting podcasts with engaging guests</h3>
        </section>
        <section className="MobileLoggedIn-authenticate">
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

export default connect(mapStateToProps)(MobileLoggedIn);