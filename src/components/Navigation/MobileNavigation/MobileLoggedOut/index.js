import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import './LoggedOut.scss'

class LoggedOut extends Component {
  render() {
    return (
      <div className="LoggedOut">
        <section className="LoggedOut-logo">
            <Link to="/"><h1>Podcasts</h1></Link>
        </section>
        <section className="LoggedOut-middle">
            <h3>Connecting podcasts with engaging guests</h3>
        </section>
        <section className="LoggedOut-authenticate">
            <Link to='/login'>
                <button>Login</button>
            </Link>
            <Link to='/register'>
                <button>Register</button>
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

export default connect(mapStateToProps)(LoggedOut);
