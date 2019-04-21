import React, { Component } from 'react';
import { Navigation, BlogPost, Footer } from '../../src/components/';
import { Helmet } from "react-helmet";

class BlogPostPage extends Component {

  render() {
    return (
        <div className="App">
            <Helmet>
                <title>Podcast guests</title>
            </Helmet>
            <Navigation />
            <BlogPost {...this.props}/>
            <Footer />
        </div>
    );
  }
}


export default BlogPostPage;
