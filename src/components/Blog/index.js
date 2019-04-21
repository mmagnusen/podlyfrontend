import React, { Component } from 'react';
import axios from 'axios'
import { BlogThumbnail } from '../'
import './Blog.scss'

class Blog extends Component {

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
            <div className='Blog'>
                <div className='Blog-inner'>
                    {/*
                        <article className='Blog-featured thumbnail'>
                            <h3>Featured title</h3>
                        </article>
                    */}
                    <section className='Blog-articles'>
                        {
                            articles && articles.map((article) => <BlogThumbnail key={article.id} article={article}/>)
                        }
                    </section>
                </div>
            </div>
        )
    }

}

export default Blog