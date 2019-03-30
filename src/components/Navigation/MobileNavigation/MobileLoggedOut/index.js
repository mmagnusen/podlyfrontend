import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import './MobileLoggedOut.scss'

class MobileLoggedOut extends Component {
  render() {
    return (
      <div className="MobileLoggedOut">
        <section className="MobileLoggedOut-logo">
            <Link to="/"><h1>Platfore</h1></Link>
        </section>
        <section className="MobileLoggedOut-middle">
            <h3>Connecting podcasts with engaging guests</h3>
        </section>
        <section className="MobileLoggedOut-authenticate">
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

export default connect(mapStateToProps)(MobileLoggedOut);
