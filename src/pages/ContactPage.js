import React, { Component } from 'react';
import { Navigation, Contact, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class ContactPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <Contact />
            <Footer />
        </div>
    );
  }
}


export default ContactPage;
