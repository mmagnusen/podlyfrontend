import React, { Component } from 'react';
import { Link  } from '../../';
import { connect } from 'react-redux'
import userAsyncActions from '../../../redux/actions/user/asyncActions'

class DesktopNavigation extends Component {

  handleLogout = () => {
    this.props.dispatch((userAsyncActions.handleLogout()))
  }

  render() {
    return (
      <div className="LoggedIn">
        
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