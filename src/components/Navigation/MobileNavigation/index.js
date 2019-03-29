import React, { Component } from 'react';
import { MobileLoggedIn, MobileLoggedOut  } from '../../';
import { connect } from 'react-redux'

class MobileNavigation extends Component {


  render() {
    
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    return (
      <div className="MobileNavigation">
          {
            isLoggedIn === 'true' ? <MobileLoggedIn /> : <MobileLoggedOut />
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

export default connect(mapStateToProps)(MobileNavigation);