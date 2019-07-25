import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { LINK_TYPE } from '../../../constants'

const Link = ({ type, to, children }) => (
    <section className='Link'>
        {type === LINK_TYPE.INTERNAL ? 
            <ReactLink to={to}>{children}</ReactLink> : 
            <a href={to} target='_blank' rel='noopener noreferrer'>{children}</a>
        }
    </section>
);

export default Link;