import React, { Component } from 'react';
import { Navigation, Blog, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class BlogPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <Blog />
            <Footer />
        </div>
    );
  }
}


export default BlogPage;
