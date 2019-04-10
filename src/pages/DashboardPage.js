import React, { Component } from 'react';
import { Navigation, Dashboard, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class DashboardPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <Dashboard />
            <Footer />
        </div>
    );
  }
}


export default DashboardPage;
