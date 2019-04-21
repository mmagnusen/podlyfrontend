import React, { Component } from 'react';
import { Navigation, Blog, Footer } from '../../src/components/';

class BlogPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <Blog />
            <Footer />
        </div>
    );
  }
}


export default BlogPage;
