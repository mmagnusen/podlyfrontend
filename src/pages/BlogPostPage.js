import React, { Component } from 'react';
import { Navigation, BlogPost, Footer } from '../../src/components/';

class BlogPostPage extends Component {

  render() {
    return (
        <div className="App">
            <Navigation />
            <BlogPost {...this.props}/>
            <Footer />
        </div>
    );
  }
}


export default BlogPostPage;
