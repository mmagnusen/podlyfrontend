import React, { Component } from 'react';
import { MobileNavigation, DesktopNavigation } from '../../components/';
import { Responsive} from 'semantic-ui-react';
import './Navigation.scss';

class Navigation extends Component {

  state = {
    navigationDropDownOpen: false
  }

  toggleNavigationDropdown = () => {
    this.setState({
        navigationDropDownOpen: !this.state.navigationDropDownOpen
    })

    if (!this.state.navigationDropDownOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'scroll'
    }
}


  render() {

    const { navigationDropDownOpen } = this.state;

    return (
        <nav className='Navigation'>
            <Responsive maxWidth={767}>
                <MobileNavigation 
                    toggleNavigationDropdown={this.toggleNavigationDropdown} 
                    navigationDropDownOpen={navigationDropDownOpen} />
            </Responsive>
            <Responsive minWidth={768}>
                <DesktopNavigation />
            </Responsive> 
        </nav>
    );
  }
}

export default Navigation;
