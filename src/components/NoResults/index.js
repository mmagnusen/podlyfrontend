import React, { Component } from 'react';
import './NoResults.scss'

class NoResults extends Component {
    render() {

        return (
            <section className='NoResults'>
                    <h3>There are no podcasts matching your search. Please widen your search to see results</h3>
            </section> 
        )
    }
}

export default NoResults