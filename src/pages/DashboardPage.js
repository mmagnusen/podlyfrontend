import React, { Component } from 'react';
import { Header, Dashboard } from '../../src/components/';
import { Helmet } from "react-helmet";

class DashboardPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Header />
            <Dashboard />
        </div>
    );
  }
}


export default DashboardPage;
