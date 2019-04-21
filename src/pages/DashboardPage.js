import React, { Component } from 'react';
import { Navigation, Dashboard, Footer } from '../../src/components/';

class DashboardPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Dashboard />
            <Footer />
        </div>
    );
  }
}


export default DashboardPage;
