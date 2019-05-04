import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import './BlogPost.scss'


class BlogPost extends Component {
    state = {}

    componentDidMount () {

        const id = parseInt(this.props.match.params.id)

        axios(`https://public-api.wordpress.com/wp/v2/sites/clearli.wordpress.com/posts/${id}`)
        .then(({data}) => {
            this.setState({
                title : data.title.rendered,
                content: data.content.rendered,
                date: data.date,
                featuredImage: data.jetpack_featured_media_url
            })

        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    render() {

        const {title, content, date, featuredImage } = this.state 

        const formattedDate = moment(date).format("MMM Do YYYY")

        return (
            <div className='BlogPost'>
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
        </div>
        )
    }
}

export default BlogPost