import React, { Component } from 'react';
import dog from '../../../../resources/dog.jpg'
import { Button } from '../../../';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import userActionGenerators from '../../../../redux/actions/user/userActionGenerators'
import './DropdownMenu.scss';

class DropdownMenu extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  handleLogout = () => {
    this.props.dispatch(userActionGenerators.handleLogout())
  }

  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  render() {

    const { profile } = this.props.user;

    return (
      <div className='DropdownMenu'>
        <img 
        src={profile ? profile : dog}
        onClick={this.showMenu}
        />
        
        {
          this.state.showMenu
            ? (
              <div
                className="DropdownMenu-menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
            <Link to='/dashboard'>
                <Button>Dashboard</Button>
            </Link>
            <Button onClick={this.handleLogout}>Logout</Button>
              </div>
            )
            : (
              null
            )
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

export default connect(mapStateToProps)(DropdownMenu);