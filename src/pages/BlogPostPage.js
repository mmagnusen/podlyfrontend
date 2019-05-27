import React, { Component } from 'react';
import { BlogPost } from '../../src/components/';

class BlogPostPage extends Component {

  render() {
    return (
        <div className="App">
            <BlogPost {...this.props}/>
        </div>
    );
  }
}


export default BlogPostPage;
