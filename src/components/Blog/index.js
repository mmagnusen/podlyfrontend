import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

class Home extends Component {

    state = {
        articles: []
    }

    componentDidMount () {

        axios('https://public-api.wordpress.com/wp/v2/sites/clearli.wordpress.com/posts/')
        .then((response) => {
            console.log('response', response)

            this.setState({
                articles: response.data
            })

        })
        .catch((error) => {
            console.log('error', error)
        })
    }

  render() {
    const { articles } = this.state
    return (
      <div className="App">
        <h1>Blog</h1>
        <div className='Blog'>
                    <div className='container'>
                        {/*
                            <article className='Blog-featured thumbnail'>
                                <h3>Featured title</h3>
                            </article>
                        */}
                        <section className='Blog-articles'>
                            {
                                articles && articles.map((article) => (
                                    <Link to={`/blog/${article.slug}`}>{article.slug}</Link>
                                ))
                            }
                        </section>
                    </div>
                </div>
      </div>
    );
  }
}

export default Home;
