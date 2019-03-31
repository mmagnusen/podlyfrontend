import React, { Component, Fragment } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import userActionGenerators from '../../../redux/actions/user/userActionGenerators'
import './MobileNavigation.scss'

class MobileNavigation extends Component {

  state = {
    dropdownOpen: false
  }

  handleLogout = () => {
    this.props.dispatch(userActionGenerators.handleLogout())
  }

  getDropdownMenu = () => {
    const { user } = this.props
    return (
      <div className='MobileNavigation-dropdown'>
        <div className='MobileNavigation-dropdownInner'>

        {user.token === null && (
          <Fragment>
            <Link to="/login" onClick={this.toggleDropdown}><h3>Login</h3></Link>
            <Link to="/register" onClick={this.toggleDropdown}><h3>Register</h3></Link>
          </Fragment>
        )}
        
        {user.token !== null && (
          <Fragment>
            <Link to="/dashboard" onClick={this.toggleDropdown}><h3>Dashboard</h3></Link>
            <h3 onClick={this.handleLogout}>Logout</h3>
          </Fragment>
        )}

        </div>
      </div>
    )
  }

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    
    const { dropdownOpen } = this.state

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
            <section className='burger' onClick={this.toggleDropdown}>
                <div className='burger-row'/>
                <div className='burger-row'/>
                <div className='burger-row'/>
            </section>
        </section>
      </div>
      { dropdownOpen && this.getDropdownMenu() }
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