import React from 'react';
import { DesktopLoggedIn, DesktopLoggedOut  } from '../../';
import { connect } from 'react-redux';

const DesktopNavigation = ({ user }) => (
  <div className="DesktopNavigation">
      {
        user.token !== null ? <DesktopLoggedIn /> : <DesktopLoggedOut />
      }
  </div>
);

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
};

export default connect(mapStateToProps)(DesktopNavigation);