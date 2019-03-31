import React, { Component } from 'react';
import { DesktopLoggedIn, DesktopLoggedOut  } from '../../';
import { connect } from 'react-redux'

class DesktopNavigation extends Component {


  render() {
    const {user} = this.props
    return (
      <div className="DesktopNavigation">
          {
            user.token !== null ? <DesktopLoggedIn /> : <DesktopLoggedOut />
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(DesktopNavigation);