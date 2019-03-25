import React, { Component } from 'react';
import { connect } from 'react-redux'
import { LoggedIn, LoggedOut } from '../../components/'
import './Header.scss'

class Header extends Component {
  render() {

    const { user } = this.props
    return (
      <div className="Header">
        { user.isLoggedIn === true ? <LoggedIn /> : <LoggedOut /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(Header);
