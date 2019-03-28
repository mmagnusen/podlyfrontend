import React, { Component } from 'react';
import { connect } from 'react-redux'
import userAsyncActions from '../../../redux/actions/user/asyncActions'

class MobileNavigation extends Component {

  handleLogout = () => {
    this.props.dispatch((userAsyncActions.handleLogout()))
  }

  render() {
    return (
      <div>
        
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