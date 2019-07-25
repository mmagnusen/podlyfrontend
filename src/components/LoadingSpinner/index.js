import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ color = 'inherit' }) => (
    <section className='LoadingSpinner'>
        <CircularProgress color={color} />
    </section> 
);

export default LoadingSpinner;