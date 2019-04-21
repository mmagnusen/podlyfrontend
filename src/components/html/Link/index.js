import React, { Component } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { LINK_TYPE } from '../../../constants'

class Link extends Component {

    render() {
        const { type, to, children } = this.props
        return (
            <section className='Link'>
                {type === LINK_TYPE.INTERNAL ? 
                    <ReactLink to={to}>{children}</ReactLink> : 
                    <a     
                    href={to}
                    target='_blank'
                    rel='noopener noreferrer'>{children}</a>
                }
            </section>
        )
    }
}

export default Link