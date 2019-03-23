import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadingSpinner.scss'

class LoadingSpinner extends Component {
    render() {

        const { color = 'inherit' } = this.props
        return (
            <section className='LoadingSpinner'>
                    <CircularProgress color={color} />
            </section> 
        )
    }
}

export default LoadingSpinner