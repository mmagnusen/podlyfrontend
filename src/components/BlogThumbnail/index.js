import React, { Component } from 'react';
import { Link } from '../';
import moment from 'moment';
import { LINK_TYPE } from '../../constants';
import './BlogThumbnail.scss';

class BlogThumbnail extends Component {
    render() {
        const { article } = this.props;

        const date = moment(article.date).format("MMM Do YYYY");

        const postLink = `/blog/${article.slug}`;

        return (
            <div className='BlogThumbnail'>
                <section className='BlogThumbnail-image' style={{backgroundImage: `url(${article.jetpack_featured_media_url})`}}>
                    <Link to={postLink} type={LINK_TYPE.INTERNAL}><div className='BlogThumbnail-imageFiller'/></Link>
                </section>
                <section className='BlogThumbnail-text'>

                    <div className='BlogThumbnail-details'>
                        <p></p><p>{date}</p>
                    </div>

                    <div className='BlogThumbnail-title'>
                        <Link to={postLink} type={LINK_TYPE.INTERNAL}><h3>{article.title.rendered}</h3></Link>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: article.excerpt.rendered}} className='BlogThumbnail-excerpt'>
                    </div>
                </section>
            </div>
        )
    }
}

export default BlogThumbnail;