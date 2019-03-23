import React, { Component } from 'react';
import axios from 'axios'

class Post extends Component {

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

        const formattedDate = 'moment'

        return (
                <div className='Post'>
                    <section className='Post-header'>
                            <section className='Post-headerImage' style={{backgroundImage: `url(${featuredImage})`}}/>
                    </section>

                    <div className='Post-main'>
                    <section className='container'>
                        <section className='Post-title'>
                            {title && <h1>{title}</h1>}
                        </section>
                        <section className='Post-date'>
                            {formattedDate && <h3>{formattedDate}</h3>}
                        </section>
                        <section dangerouslySetInnerHTML={{__html: content}} className='Post-content'>
                        </section>
                    </section>
                    </div>
                </div>
        )
    }
}

export default Post