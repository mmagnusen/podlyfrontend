import React, { Component } from 'react';
import { DesktopLoggedIn, DesktopLoggedOut  } from '../../';
import { connect } from 'react-redux'

class DesktopNavigation extends Component {


  render() {
    
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    return (
      <div className="DesktopNavigation">
          {
            isLoggedIn === 'true' ? <DesktopLoggedIn /> : <DesktopLoggedOut />
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