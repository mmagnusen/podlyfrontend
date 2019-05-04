import React, { Component, Fragment } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import { NavigationItems } from '../../'
import userActionGenerators from '../../../redux/actions/user/userActionGenerators'
import './MobileNavigation.scss'

class MobileNavigation extends Component {

  state = {
    mobileNavOpen: false
  }

  handleLogout = () => {
    this.toggleMobileNavigation()
    this.props.dispatch(userActionGenerators.handleLogout())
  }

  toggleMobileNavigation = () => {
    this.setState({
      mobileNavOpen: !this.state.mobileNavOpen
    })
  }

  getDropdownMenu = () => {
    const { user } = this.props
    const { mobileNavOpen } = this.state;

    return (
      <Drawer anchor="left" open={mobileNavOpen} classes={{paper: 'MobileNavigation-drawer'}} onClose={this.toggleMobileNavigation}>
        <div className='MobileNavigation-dropdown'>
          <div className='MobileNavigation-dropdownInner'>

          {user.token === null && (
            <Fragment>
              <Link to="/" onClick={this.toggleMobileNavigation}><h3 className='MobileNavigation-link MobileNavigation-loginRegister'>Home</h3></Link>
              <Link to="/login" onClick={this.toggleMobileNavigation}><h3 className='MobileNavigation-link MobileNavigation-loginRegister'>Login</h3></Link>
              <Link to="/register" onClick={this.toggleMobileNavigation}><h3 className='MobileNavigation-link MobileNavigation-loginRegister'>Register</h3></Link>
            </Fragment>
          )}
          
          {user.token !== null && (
            <Fragment>
              <Link to="/" onClick={this.toggleMobileNavigation}><h3 className='MobileNavigation-link MobileNavigation-home'>Home</h3></Link>
              <section>
                <h3>Dashboard</h3>
              </section>
              <NavigationItems toggleMobileNavigation={this.toggleMobileNavigation}/>
              <h3 className='MobileNavigation-link MobileNavigation-logout' onClick={this.handleLogout}>Logout</h3>
            </Fragment>
          )}

          </div>
        </div>
      </Drawer>
    )
  }

  render() {

    return (
      <div>
      <div className="MobileNavigation">
        <section className="MobileNavigation-logo">
            <Link to="/"><h1>Platfore</h1></Link>
        </section>
        <section className="MobileNavigation-middle">
            <h3>Connecting podcasts with engaging guests</h3>
        </section>
        <section className="MobileNavigation-authenticate">
            <section className='burger' onClick={this.toggleMobileNavigation}>
                <div className='burger-row'/>
                <div className='burger-row'/>
                <div className='burger-row'/>
            </section>
        </section>
      </div>
      {this.getDropdownMenu() }
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