import React, { Component } from 'react';
import classnames from 'classnames'
import CircularProgress from '@material-ui/core/CircularProgress';
import './Button.scss'

class Button extends Component {

    render() {
        const { children, onClick, disabled, loading, classes } = this.props;
        return (
            <div className={classnames('Button', classes)}>
                <button onClick={onClick} className={classnames({'Button-disabled': disabled, 'Button-loading': loading})}>{loading ?  <CircularProgress className='Button-loadingSpinner' color="secondary" /> : children}</button>
            </div>
        )
     
    }
}

export default Button