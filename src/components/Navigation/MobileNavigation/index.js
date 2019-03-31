import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import './MobileNavigation.scss'

class MobileNavigation extends Component {

  state = {
    dropdownOpen: false
  }

  getDropdownMenu = () => {
    return (
      <div className='MobileNavigation-dropdown'>
        <div className='MobileNavigation-dropdownInner'>
        <Link to="/login" onClick={this.toggleDropdown}><h3>Login</h3></Link>
        <Link to="/register" onClick={this.toggleDropdown}><h3>Register</h3></Link>
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
    
    const isLoggedIn = localStorage.getItem('isLoggedIn')
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
      { dropdownOpen && this.getDropdownMenu()}
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