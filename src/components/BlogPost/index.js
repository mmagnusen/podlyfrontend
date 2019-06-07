import React, { Component, Fragment } from 'react';
import axios from 'axios'
import moment from 'moment'
import { NewsLetterCapture } from '../'
import './BlogPost.scss'


class BlogPost extends Component {
    state = {}

    componentDidMount () {

        const slug = this.props.match.params.slug;

        axios(`https://public-api.wordpress.com/wp/v2/sites/clearli.wordpress.com/posts?slug=${slug}`)
        .then(({data}) => {
            console.log(data[0])
            this.setState({
                title : data[0].title.rendered,
                content: data[0].content.rendered,
                date: data[0].date,
                featuredImage: data[0].jetpack_featured_media_url
            })

        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    render() {

        const {title, content, date, featuredImage } = this.state 
        console.log(this.state)

        const formattedDate = moment(date).format("MMM Do YYYY")

        return (
            <div className='BlogPost'>
                {title && (
                    <Fragment>
                    <section className='BlogPost-header'>
                            <section className='BlogPost-headerImage' style={{backgroundImage: `url(${featuredImage})`}}/>
                    </section>
                    <div className='BlogPost-main'>
                        <section className='container'>
                            <section className='BlogPost-title'>
                                {title && <h1>{title}</h1>}
                            </section>
                            <section className='BlogPost-date'>
                                {formattedDate && <h3>{formattedDate}</h3>}
                            </section>
                            <section dangerouslySetInnerHTML={{__html: content}} className='BlogPost-content'>
                            </section>
                        </section>
                    </div>
                    </Fragment>
                )}
            <NewsLetterCapture />
            </div>
        )
    }
}

export default BlogPost