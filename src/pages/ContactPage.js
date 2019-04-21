import React, { Component } from 'react';
import { Navigation, Contact, Footer } from '../../src/components/';

class ContactPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Contact />
            <Footer />
        </div>
    );
  }
}


export default ContactPage;
